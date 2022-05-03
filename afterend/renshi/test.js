
var exec = require('child_process').exec;
const path = require('path');
exec(`conda activate zjrtemp && python ./LaughDetection-master/live_inference.py --save_file=output.csv C:\\Users\\tony5\\Desktop\\cxcy\\afterend\\renshi\\public\\article\\UirBmy0HpAUZN-J_ibi7z.wav`,function(error,stdout,stderr){
    console.log(stdout);
    if(error) {
        console.info('stderr : '+stderr);
    }
});