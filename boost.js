const fs = require("fs");

const keygen = require("./keygen");

module.exports = class Boost {
    constructor() {
        this.path_folder = "./notes/";
        this.folderSet = "88ef97da5a7faca4275b";

        // get filename
        this.filename = keygen();
    }

    set title(title) {
        this.titleSet = title;
    }

    set content(content) {
        this.contentSet = content;
    }

    set tags(tags) {
        this.tagsSet = tags;
    }

    writeToFile() {
        // get timestamp
        this.timestamp = new Date().toISOString();
        this.createdAt = "createdAt: \"" + this.timestamp + "\"\n";
        this.updatedAt = "updatedAt: \"" + this.timestamp + "\"\n";
        this.titleToWrite = "title: \"" + this.titleSet + "\"\n";
        this.type = "type: \"" + "MARKDOWN_NOTE" + "\"\n";
        this.folder = "folder: \"" + this.folderSet + "\"\n";
        this.contentToWrite = "content: '''\n" + this.contentSet + "\n'''\n";
        this.tagsToWrite = "tags: " + this.tagsSet + "\n";
        this.isStarred = "isStarred: " + "false" + "\n";
        this.isTrashed = "isTrashed: " + "false" + "\n";
        this.linesHighlighted = "linesHighlighted: " + "[]" + "\n";

        // put together text to write
        const text_to_write = this.createdAt + this.updatedAt + this.titleToWrite + this.type + this.folder + this.contentToWrite + this.tagsToWrite + this.isStarred + this.isTrashed + this.linesHighlighted;

        // write to file
        fs.writeFileSync(this.path_folder + this.filename + ".cson", text_to_write);
        console.log("Written note to: " + this.path_folder + this.filename + ".cson")
    }
}