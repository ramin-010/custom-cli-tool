const { Command } = require ('commander');
const { log } = require('console');
const program = new Command();
const fs = require('fs');
const path = require('path')



program
    .name('Counter-CLI')
    .description('cli to count the no of words in a file')
    .version('1.0.0');

program
    .command('count')
    .description('count the no of words in file')
    .option('-p, --Filepath <flepath>','file path')
    .option('-e, --encoding <encoding>', 'Encoding used', 'utf-8')   //added an default encoding if user doesn't add the encoding type
    .action((opts)=>{
        const Filepath = opts.Filepath;
        const encoding = opts.encoding;
        const FullPath = path.resolve(Filepath);    //it returns the full path of the file

   
        const data = fs.readFileSync(FullPath, encoding);   // fs library to read the file
        
        let inword = false;
        let count = 0; 
        for(let i=0; i<data.length;i++){    //logic to count the no of words
            let char = data[i];

            if(char.trim() === ""){
                inword = false;
            }else if(!inword){
                inword = true;
                count++;
            }
        }
        
    log(`the no of words in this file is : ${count}`);    
    })


    program.parse(process.argv);