// Cluster modülü, Node uygulamalarında çoklu iş parçacığı kullanmamızı sağlayan bir built-in Node.js paketidir. 

// cluster modülü yüklenir (built-in)
const cluster = require("cluster");
// os modülü yüklenir (built-in)
const os = require("os");

// cluster modülünü kullanarak işlemci çekirdeği sayısı belirlemek
const CPUSnum = os.cpus().length;

// işlemci çekirdek sayısını yazdır
console.log(CPUSnum); 

// bir ana iş parçacığı (master) oluşturun. Bu, diğer iş parçacıklarını yönetecek ve kontrol edecektir:
if(cluster.isMaster){
    // ana iş parçacığı
    console.log(`Master iş parçacığı PID: ${process.pid}`);

    for (let i=0; i<CPUSnum ; i++ ){
        cluster.fork() // işçi iş parçacıklarını oluştur
    };

    // bir işçi iş parçacığı oluşturulduğunda konsola yazdır
    cluster.on("fork", function(worker, err){
        console.log(`\t İşçi iş parçacığı yaratıldı: (worker ${worker.process.pid})`);
    });

    // işçi iş parçacıklarının hatalarını izle ve yeniden başlat
    cluster.on("exit", (worker, code, signal)=> {
        console.log(`İşçi iş parçacığı: ${worker.process.pid} sonlandırıldı`);
        cluster.fork() // yeni işçi iş parçacığı oluştur
    });

} else {
    // işçi iş parçacığı
    console.log(`İşçi iş parçacığı PID: ${process.pid}`);
 
    const http = require('http');
      http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Merhaba Dünya!');
    }).listen(3000);
};

