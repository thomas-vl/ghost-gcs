const StorageBase = require('ghost-storage-base'),
      {Storage} = require('@google-cloud/storage');
//const common = require('../../../../current/core/server/lib/common');

class GStore extends StorageBase {
    constructor(config) {
        super();
        var storage = new Storage({"keyFilename": config.key});
        this.bucket = storage.bucket(config.bucket)
    }

    exists(fileName, targetDir) {
        return new Promise((resolve, reject) => {
            this.bucket.file(targetDir+'/'+fileName).exists()
            .then(data=>{
                resolve(data[0])
            })
        })
    }
     
    /**
     * Saves the image to google cloud storage
     * - image is the express image object
     * - returns a promise which ultimately returns the full url to the uploaded image
     *
     * @param image
     * @param targetDir
     * @returns {*}
     */
    save(image, targetDir) {
        return new Promise((resolve, reject) => {
            targetDir = this.getTargetDir()
            this.getUniqueFileName(image, targetDir).then(filename=>{
                var opts = {
                    predefinedAcl: 'publicRead',
                    destination: filename
                }
                return this.bucket.upload(image.path, opts)
            }).then(response =>{
                var url = 'https://storage.googleapis.com/'+
                    response[0].metadata.bucket+'/'+
                    response[0].name
                resolve(url)
            }).catch(e=>{
                //common.logging.error(JSON.stringify(e))
                reject(e)
            });
        })
  
    }
  
    serve() {
        return function(req, res, next) {
            next();
        };
    }

    delete(filename) {
        //common.logging.info('delete:')
        //common.logging.info(JSON.stringify(filename))
        return this.bucket.file(filename).delete();
    }
  
    read(filename) {
        //common.logging.info('read:')
        //common.logging.info('file name: '+filename)
        var rs = this.bucket.file(filename).createReadStream(), contents = '';
        return new Promise(function (resolve, reject) {
            rs.on('error', function(err){
                reject(err);
            });
            rs.on('data', function(data){
            contents += data;
            });
            rs.on('end', function(){
                resolve(content);
            });
        });
    }
}

module.exports = GStore;
