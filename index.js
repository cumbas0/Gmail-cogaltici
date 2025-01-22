const readline = require('readline');
const fs = require('fs');
const { log } = require('console');
const { loadEnvFile } = require('process');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sor = (soru) =>{
    return new Promise((cevapla)=> {
        rl.question(soru, (cevap) =>{
            cevapla(cevap);
        });
    });
};


(async () =>{
    try{

    
    const mailTuru = await sor('Ne tür maili çoğaltıcaksınız? (örnek : Gmail , Outlok , Hotmail):');
    const adetSTR = await sor ('Kaç adet  çoğaltılacak? (0-1000 arası):');
    const mail = await sor('Çoğaltılacak mail adresini yazınız: ');

    const  adet  = parseInt(adetSTR, 10);

    if(isNaN(adet) || adet < 1 || adet > 10000){
        console.log('Hata: Çoğaltılacak adet  sayısı  minimum: 1 , maximum 1000 adet olmalıdır');
        rl.close();
        return;
    }



    if(!mail.includes('@')){
        console.log(('Hata: Geçerli bir mail adresi girinizi'));
        rl.close();
        return;
    }


    const mailParts = mail.split('@');
    const baseName = mailParts[0];
    const domain = mailParts[1];


    const mails = [];
    for(let i = 1; i <= adet; i++)
    {
        mails.push(`${baseName}+${i}@${domain}`);
    }


    const fileName = `cogatilmis_mailler_${mailTuru.toLowerCase()}.txt`;
    fs.writeFileSync(fileName, mails.join('\n'), 'utf8');
    console.log(`Mail adresleri başarıyla "${fileName}" dosyasına kaydedildi!`);
    

    rl.close();

    }catch (error) {
        console.error('Bir hata oluştu:', error);
        rl.close();
    }

})();
