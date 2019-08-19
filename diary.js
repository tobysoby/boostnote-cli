const Boost = require('./boost.js')
const program = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-t, --title <title>', 'title of note. If no title is given, defaults to today.')
  .option('-y, --yesterday', 'if no title is given, set date to yesterday.')
  .option('-c, --content <content>', 'content of note')
  .option('-ta, --tags <tags>', 'tags of note')

program.parse(process.argv);

let { title, content, tags } = program;

if (!program.title) {
    var d = new Date();

    //yesterday
    if (program.yesterday) d.setDate(d.getDate()-1);

    let mm = d.getMonth() + 1; // getMonth() is zero-based
    mm = (mm>9 ? '' : '0') + mm
    let dd = d.getDate();
    dd = (dd>9 ? '' : '0') + dd
    let yyyy = d.getFullYear()
    let date = dd + "." + mm + "." + yyyy;
    title = date
}

if ("tags") tags = "[\"Tagebuch\"]"

const boost = new Boost();
if (program.debug) {
    console.log("path_folder: " + boost.path_folder);
    console.log("folderSet: " + boost.folderSet);
} else {
    boost.title = title;
    boost.content = content;
    boost.tags = tags;
    boost.writeToFile();
}