const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
    let ans = [{"content":"在高车人的葬礼中，大家看到弓和刀，都很熟悉，都见过，可是","level":2},{"content":"在今天敦煌莫高窟的壁画中，有一幅叫作《五百强盗成佛图》，这是关于中国古代军事战争最栩栩如生的一幅画面","level":2},{"content":"然而我们却发现，作为典型的游牧民族的高车人，在他们的墓葬中，在表现亡灵战士的纪念碑的时候，那个人的身上是使用长兵器的，有一支长槊","level":1},{"content":"由此我们知道，夺取对方的槊是当时在马背上用长兵器作战的人战斗力爆棚的一种表现","level":2},{"content":"右侧的这位骑士手持大约是人身长两倍的一支长兵器，尽力地向左边的骑士进行刺杀","level":2},{"content":"乌桓人也是典型的游牧民族，他们也开始使用了长兵器，和高车人一样","level":1},{"content":"这些人是活跃在东汉帝国边境幽州一带的乌桓人，这些乌桓人组成的骑兵部队，在当时被叫作乌桓突骑","level":2},{"content":"这种现象并不是高车人的独例，在高车人之前的几百年，当时东汉帝国的北部边防已经完全空虚了下来，所以东汉帝国必须要利用一批少数民族作为自己的雇佣兵，来为自己镇守边疆，甚至去出击更遥远的其他少数民族的军队或者部落","level":2},{"content":"这幅画面上还有一个细节非常值得我们注意，在这些骑在马背上的战士的腰间，都有一条小小的褐色的弧线，它是弓，而骑马射箭，这是北方草原游牧民族最典型的一种战争技术","level":1},{"content":"不仅马骑得漂亮，而且射术高明，他“控弦破左的，右发摧月支”，居然是利用游牧民族骑马射箭的这一套战术去“长驱蹈匈奴，左顾凌鲜卑”","level":2},{"content":"这样的一种形象出现在了唐代的墓葬中，他们静静地守卫着在墓穴中沉睡的公主，而在这些人身上，既有来自草原上的鞍马骑射的文化塑造，也有来自中国的横槊赋诗的文化形象，双方被紧密地融合在一起，成为中国艺术史中的代表作品，成为我们的文化的一部分","level":2}]
    res.send(ans)
//   let Dir = path.join(
//     __dirname,
//     "../",
//     "../",
//     "public",
//     "article",
//     req.body.id + ".txt"
//   );
//   var exec = require("child_process").exec;
//   // var content1 = path.join(__dirname, Dir);
//   exec(
//     `python ./Textling/duplicate.py ${Dir}`,
//     function (error, stdout, stderr) {
//       if (stdout.length > 1) {
//         console.log(req.body.id);
//         fs.readFile("C:\\Users\\tony5\\Desktop\\cxcy\\afterend\\renshi\\Textling\\paragraph.txt", "utf-8", (err, data) => {
//           if (err) throw err;
//           // console.log(data);
//         res.send(data)
//         });
//       } else {
//         console.log("you don't offer args");
//       }
//       if (error) {
//         console.info("stderr : " + stderr);
//       }
//     }
//   );
};
