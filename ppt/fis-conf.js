// 默认走dev
fis.media('dev').match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css',
    })


fis.media('qa')
    .match('*', {
      deploy: fis.plugin('http-push', {
        receiver: 'http://www.ldxdxx.com/receiver.php',  // 线上测试服务器地址
        to: '/data/www/edire/ldxdxx/aaa' // 注意这个是指的是测试机器的路径，而非本地机器
      })
    })

fis.set('project.md5Length', 8);


fis.media('product')
    .match('*.js', {
        optimizer: fis.plugin('uglify-js'),
        packTo: '/js/pkg.js',
    }).match('*.css', {
        optimizer: fis.plugin('clean-css'),
        packTo: '/css/pkg.css',
         // relative: true
    }).match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css',
        optimizer: fis.plugin('clean-css'),
        packTo: '/css/pkg.css'
    }).match('/css/pkg.css', {
        useHash: true,
        release: '/static/css/pkg.css', // fis.set('namespace', 'home'),
        url: '/Public/css/pkg.css',     // 设置发布虚拟路径
        domain: 'http://www.jikexueyuan.com'  // 设置发布cdn之类的路径
    }).match('/js/pkg.js', {
        useHash: true,
        release: '/static/js/pkg.js' // fis.set('namespace', 'home'),

    }).match('/common/**', {  // 上线时不需要的文件设置 release:false,这些文件就不存在了
        release: false
    }).match('/config/**', {
        release: false
    }).match('/test/**', {
        release: false
    }).match('server.conf', {
        release: false
    }).match('::packager', {
        postpackager: fis.plugin('loader', {  // 打包后，讲html等链接到相关文件的href src 等替换成打包以后的地址
            allInOne: true
        })
    })

    .match('**', {
        deploy: [
            fis.plugin('skip-packed'),   // 打包后 把打包前的 单个文件删掉
            fis.plugin('local-deliver', {   // 设置发布路径 fis3 release -d ../out
                to: '../out'
            })
        ]
    })
