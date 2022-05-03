import enum
import re
from tkinter.tix import Tree
import jieba
import numpy
import json
import jieba.analyse
from math import sqrt

class key_text:
    def __init__(self):
        pass
    @staticmethod
    def dot(st,nd):                     #计算点积
        answer=0
        for s,n in zip(st,nd):
            answer+=s*n
        return answer
    @staticmethod
    def distance(vector):                           #计算距离
        sum_of_square=0
        for value in vector:
            sum_of_square+=value*value
        return sqrt(sum_of_square)
    def similarity(self,st,nd):              #利用余弦计算词向量的相似度
        product=self.dot(st,nd)
        division=self.distance(st)*self.distance(nd)
        sim=product/division
        return sim
    @staticmethod
    def align(st,nd):               #将词向量格式化处理，得到对齐的稀疏向量
        words=list(set(dict(st+nd).keys()))
        vector_1=numpy.zeros(len(words))
        vector_2=numpy.zeros(len(words))
        for i,word in enumerate(words):
            for wordinfo in st:
                if word==wordinfo[0]:vector_1[i]=wordinfo[1]
            for wordinfo in nd:
                if word==wordinfo[0]:vector_2[i]=wordinfo[1]
        return vector_1,vector_2
    def solve(self,text):
        pattern=re.compile(u"[^\u3002\uff1f\uff01]+[\u3002\uff1f\uff01]?")
        para_kw=jieba.analyse.extract_tags(text,20,True)
        sentences=pattern.findall(text)
        vectors=[]
        for s in sentences:
            vectors.append(jieba.analyse.extract_tags(s,20,True))
        sim=[]
        for vtr in vectors:
            st,nd=self.align(vtr,para_kw)
            sim.append(self.similarity(st,nd))
        index=sim.index(max(sim))
        return sentences[index]
class token_item:
    '''
    结构体,方便获取对象的属性,用于createTokenTable()函数的返回值元素.
    '''
    def __init__(self,start,occur_list,total_occur=1,related_para=1,last_para=0,last_pseud=0):
        self.__dict__.update(locals())
        del self.__dict__['self']

class texttiling:
    def __init__(self,pseud_size=15,block_size=5,window_width=10,stopwords=None):#ok
        '''
        构造函数,将给定属性值保存下来,供类中的其他函数使用.
        '''
        self.pseud_size=pseud_size   #伪句子中单词数的多少;
        self.block_size=block_size            #计算各个伪句子组之间相似度度时采用的块大小;
        self.window_width=window_width        #用于平滑各个分隔的评分曲线的窗口大小;
        self.stopwords=stopwords

    def tokenize(self,text):
        '''
        将文本基于Texttiling算法分段,并返回分段结果.
        '''
        # text=text.replace("\n","")
        origin_sentences=self.divide_into_sentences(text)
        text_without_punction=self.filter_punctuation(text)
        pseud_list=self.create_pseudosentence(text_without_punction,self.stopwords)
        tokenmap=self.create_tokenmap(pseud_list,origin_sentences)
        similarity_list=self.calculate_similarity(pseud_list,tokenmap)
        smoothified_similarity_list=self.smoothify(similarity_list)
        depth_score=self.calculate_depth_score(smoothified_similarity_list)
        boundary=self.identify_boundary(depth_score)
        # paragraphs=self.format(self.nomalize(text,boundary,origin_sentences,pseud_list))
        return self.nomalize(text,boundary,origin_sentences,pseud_list)


    def divide_into_sentences(self,text,minlength=100):#ok
        '''
        将文本根据文章的原始段落分段,段落字数不够100字的将与其他段落合并;
        返回值的格式为整型列表,其中的数字表示各个分段在原始文本中的起始位置;
        '''
        pattern=re.compile(u"[^\u3002\uff1f\uff01]+[\u3002\uff1f\uff01]?")
        match=pattern.finditer(text)
        breaklist=[0]
        previous=0
        for paragraph in match:
            if paragraph.start()-previous<minlength:
                continue
            else:
                breaklist.append(paragraph.start())
                previous=paragraph.start()
        return breaklist

    def filter_punctuation(self,text):#ok                
        '''
        筛除指定文本中的标点符号,仅保留文本;
        返回值为去除所有标点符号之后的文本,换行符和制表符被保留;
        '''
        pattern=re.compile(r"[^！？。，——“”：；【】（）「」、￥·\n\t]")
        filtered_text="".join(c.group() for c in re.finditer(pattern,text))
        return filtered_text
    @staticmethod
    def filter_stopwords(seq,file):#ok
        '''
        利用给定停用词表进行停用词的筛除,注意停用词表的格式应为每行一个词
        给定输入应为词向量表,表中每个词都用字典表示,word表示词本身,start表示词的起始位置,
        length表示词的长度.
        '''
        with open(file,'r',encoding='utf-8') as file:
            stopwords=[word.strip() for word in file.readlines()]
            for i in range(len(seq)-1,-1,-1):         
                if seq[i]['word'] in stopwords:  # or len(seq[i]['word'])<=1
                    del seq[i]

    def create_pseudosentence(self,text,stopwords):#ok
        '''
        创建伪句子,首先通过jieba分词将文本分成词向量表,表中每个词都用字典表示,word表示词本身,
        start表示词的起始位置,length表示词的长度.
        之后通过调用停用词筛除函数将词向量表中word属性(即词本身)属于停用词的词删除.
        返回值的格式为伪句子列表,其中每个元素都包含self.pseudSize个词,注意词使用字典表示.
        '''
        pseud_list=[]
        for item in jieba.tokenize(text):
            pseud_list.append({'word':item[0],'start':item[1],'length':item[2]-item[1]})
        self.filter_stopwords(pseud_list,stopwords)
        return [pseud_list[i:i+self.pseud_size] for i in range(0,len(pseud_list),self.pseud_size)]

    def create_tokenmap(self,pseud_list,origin_sentences):#ok
        '''
        创建标识表,为每个词记录在文本中出现的初始位置,在每个伪句子中出现的次数(列表类型,包含伪句子索引和出现次数),
        在文本中的总出现次数,在多少个段落中出现过,最后出现的段落索引和最后出现的伪句子索引;
        返回值即为以词本身为键,以上述信息为值的字典.
        '''
        tokentable={}
        current_paragraph=0
        it=origin_sentences.__iter__()
        curBreak=next(it)
        current_pseud=0
        for pseud in pseud_list:
            for token in pseud:
                try:
                    while token['start']>current_paragraph:
                        curBreak=next(it)
                        current_paragraph+=1
                except StopIteration:
                    pass
                if token['word'] in tokentable:
                    tokentable[token['word']].total_occur+=1
                    if tokentable[token['word']].last_para!=current_paragraph:
                        tokentable[token['word']].last_para=current_paragraph
                        tokentable[token['word']].related_para+=1
                    if tokentable[token['word']].last_pseud!=current_pseud:
                        tokentable[token['word']].last_pseud=current_pseud
                        tokentable[token['word']].occur_list.append([current_pseud,1])
                    else:                                          
                        tokentable[token['word']].occur_list[-1][1]+=1
                else:
                    tokentable[token['word']]=token_item(token['start'],[[current_pseud,1]],1,1,current_paragraph,current_pseud)
            current_pseud+=1
        return tokentable

    def calculate_similarity(self,pseud_list,tokenTable):    
        '''
        计算伪句子序列(长度由blockSize确定)之间的相似度,相似度算法为最基础的余弦相似度.
        返回值为列表,其中包含(伪句子数-1)个相似度数值.        
        '''
        gap_score=[]
        gap_length=len(pseud_list)-1

        def count_frequency(token,block):    #统计指定区间中包含多少个词语;
            tokenOccur=filter(lambda x:x[0] in block,tokenTable[token].occur_list)
            freq=sum(info[1] for info in tokenOccur)
            return freq

        for curGap in range(gap_length):
            dividend,devisor_st,divisor_nd=0,0,0
            if curGap<self.block_size-1:
                blockWidth=curGap+1
            elif curGap>gap_length-self.block_size:
                blockWidth=gap_length-self.block_size
            else:
                blockWidth=self.block_size
            block_st=list(range(curGap-blockWidth+1,curGap+1))
            block_nd=list(range(curGap+1,curGap+blockWidth+1))
            for token in tokenTable:
                dividend+=count_frequency(token,block_st)*count_frequency(token,block_nd)
                devisor_st+=count_frequency(token,block_st)**2
                divisor_nd+=count_frequency(token,block_nd)**2
            try:
                score=dividend/sqrt(devisor_st+divisor_nd)
            except ZeroDivisionError:
                score=0
            gap_score.append(score)
        return gap_score
    def smoothify(self,gapScore,window_width=11):#ok
        '''
        平滑曲线,使各个间隔之间的分数差距不太大.
        返回平滑后的分数列表.
        '''
        score=numpy.array(gapScore[:])
        if score.size<window_width:
            raise ValueError("Input vector needs to be bigger than window size.")
        if window_width<3:
            return score
        s=numpy.r_[2*score[0]-score[window_width:1:-1],score,2*score[-1]-score[-1:-window_width:-1]]
        w=numpy.ones(window_width)
        y=numpy.convolve(w/w.sum(),s,mode="same")
        return list(y[window_width-1:-window_width+1])

    def calculate_depth_score(self,scores):#ok
        '''
        计算每个相似度相对于其附近的相似度之间的差距,取宽度为min(max(len(score)//10,2),5),
        分别得到左右两边窗口中的最大值,则此分隔的差异取两最大值的和减去该值.
        '''
        depth_score=[0]*len(scores)
        clip=min(max(len(scores)//10,2),5)
        index=clip
        for gapscore in scores[clip:-clip]:
            lpeak=gapscore
            for score in scores[index::-1]:
                if score>=lpeak:
                    lpeak=score
                else:
                    break
            rpeak=gapscore
            for score in scores[index:]:
                if score>=rpeak:
                    rpeak=score
                else:
                    break
            depth_score[index]=lpeak+rpeak-2*gapscore
            index+=1
        return depth_score

    def identify_boundary(self,scores):
        '''
        判断边界,此处每4个伪句子间至多存在一个边界.
        返回0-1向量,表示对应位置的分隔为边界.
        '''
        boundaries=[0 for x in scores]
        avg=sum(scores)/len(scores)
        stdev=numpy.std(scores)
        cutoff=avg-stdev/2.0
        depthTuple=sorted(zip(scores,range(len(scores))),reverse=True)
        hp=list(filter(lambda x:x[0]>cutoff,depthTuple))
        for dt in hp:
            boundaries[dt[1]]=1
            for dt2 in hp:  #如果在当前边界附近已经存在边界,则此边界不作数.
                if dt[1]!=dt2[1] and abs(dt2[1]-dt[1])<4 and boundaries[dt2[1]]==1:
                    boundaries[dt[1]]=0
        return boundaries

    def nomalize(self,text,boundaries,sentences,pseud):
        '''
        将边界信息格式化,得到实际上的段落分隔.
        sentences:根据。！？等句子的结束符得到的句子的分割点位置序列;
        pseud:伪句子信息,即通过创建伪句子的方法返回的伪句子序列;
        boundaries:由边界识别方法返回的边界判定序列;
        text:原文本;
        '''
        paragraph=[]
        # print(sentences)
        # print(boundaries)
        def identify(site,begin):
            for index in range(begin,len(sentences)):
                if sentences[index]>site:
                    return index
            return begin             
        start=0
        for index,flag in enumerate(boundaries):
            if flag:
                tmp=start
                start=identify(pseud[index][-1]['start'],tmp)
                # print(tmp,' ',start)
                if start!=tmp:
                    # print(repr(text[sentences[tmp]:sentences[start]]),'\n',sentences[tmp],' ',sentences[start],"\n---------------------------\n")
                    paragraph.append(text[sentences[tmp]:sentences[start]])
                else: break
        if start<len(text):
            paragraph.append(text[sentences[start]:])
        return paragraph
def sectence_count(text):
    pattern=re.compile(u"[^\u3002\uff1f\uff01]+[\u3002\uff1f\uff01]?")
    return len(pattern.finditer(text))
def format_json(text):
    extracter=key_text()
    text=text.replace("\n","")
    formatted={"downward":None}
    formatted["downward"]={"direction":"downward","name":"origin","content":text,"children":[]}
    def fill(maplist,content):
        ttl=texttiling(stopwords=r'./stopwords.txt')
        paragraphs=ttl.tokenize(content)
        for paragraph in paragraphs:
            dictionary={}
            keyword=jieba.analyse.extract_tags(paragraph,1) 
            dictionary["name"]=keyword
            dictionary["logic"]=None
            dictionary["hasHumanholding"]=True
            dictionary["content"]=paragraph
            dictionary["detail"]=extracter.solve(paragraph)
            dictionary["hasChildren"]=True
            try:
                sub=ttl.tokenize(paragraph)
            except ValueError:
                dictionary["hasChildren"]=False
                sub=[]
            if len(sub)<2:
                dictionary["hasChildren"]=False
            dictionary["isExpand"]=True
            
            if dictionary["hasChildren"]:
                dictionary["children"]=[]
                fill(dictionary["children"],paragraph)
            else:
                dictionary["children"]=None
            maplist.append(dictionary)
    fill(formatted["downward"]["children"],text)
    return formatted

if __name__=='__main__':
    ttl=texttiling(stopwords=r'./stopwords.txt')
    text=open(r"./Why.txt",'r',encoding='utf-8').read()
    formatted=format_json(text)
    print(formatted)
    with open(r".\paragraph.txt",'w',encoding='utf-8') as dst:
        json.dump(formatted,dst)
    # with open(r".\formatted.txt",'w',encoding='utf-8') as dst:
    #     dst.write(str(formatted))
