Reax tutorial'a hoşgeldiniz.

# Reax nedir?
Reax düz javascript dosyaları için yazılmış bir veri yönetim kütüphanesidir.
çok basit ek kodlar yazarak javascript de değişkenleri tutduğunuz kısmı kontrol edebilir
ve en önemlisi de üzerinde yapılan değişiklikleri kontrol edebilirsiniz.

Reax başlıca state, methods, history parametrelerini alır.
İlk öncelikle Reax ı oluşturuyoruz

``` javascript
const Reax = new ReaxMain()
```

şimdi bir Reax alanı oluşturduk
ReaxMain'nin aldığı 3 parametreyi girelim.

``` javascript
const Reax = new ReaxMain({},{}, true)
```

ReaxMain içerisine 2 obje alır.
Birincisi Değişkenler, ikincisi metodlar ve üçüncüsü de geçmiş kaydıdır
eğer son parametreiy "true" yaparsanız geçmiş kaydedilir eğer "false" yaparsanız geçmiş kaydedilmez.

### ÖRNEK
``` javascript
const Reax = new ReaxMain({
    title: 'Reax.js',
}, {
    firstMethods (){
        // content
    }
}, true)
```

# firedBefore()

Basit bir store oluşturduk. Şimdi gelin ilk önce ateşlenen fonksiyona bakalım
*** firedBefore() fonksiyonunu methodsların en başına koymalısınız yoksa hata döner ***

Fire before promise yapısında olmalıdır yoksa Reax içerikleri kullanılamaz

|| ÖRNEK ||

``` javascript
const Reax = new ReaxMain({
    title: 'Reax.js',
}, {
    firedBefore (promise){
        promise.then((local) => {
           console.log('Starting Reax. Reax State : ', local.state)
        })
    },
    firstMethods (){
        // content
    }
}, true)
```

firedBefore() fonksiyonları Reax aktif olur olmaz mutlaka çalışan bir fonksiyondur.
İçerisine promis ile işlem yaptırılmalıdır.


# History

History bir array dir. State üzerinde yapılan değişiklikler geçmişini içerisinde tutar.
Eğer yeni bir Reax store oluştururken üçüncü parametre true girilirse geçmişe kaydedilme
aktif edilmiş olur.
False girilirse hiçbirşey geçmişe kaydedilmez.
Gelin yukarıda firedBefore() dan sonra oluşturduğumuz firstMethods() fonksyionumuzda
history görüntülemeyi görelim

#### NOT: firstMethods() uygulama için örnek fonksyiondur
#### Reax içerisinde barınan bir fonksiyon değildir.

# HTML
HTML kodunda Reax içerisindeki methods lar aşağıdaki gibi kullanılır.
``` html 
<button onclick="Reax.methods.firstMethods()"> run firstmethods() </button> 
```

``` javascript
firstMethods (){
    console.log(Reax.historyData)
}
```

> sonuç :    > historyData: []

Şimdi gelin state üzerinde nasıl bir değişiklik yapabiliriz ve yapdığımız bu değişiklikler
historyData da nasıl görünür ona bir göz atalım.

# updateState({})

updateState({}) içerisine bir obje parametresi alır.
ve içerisine girilen değerler eğer state içerisinde varsa
state'deki o değişkenin değeri değişir.
Fakat parametre olarak gönderilen objenin içerisindeki değişken
state içerisinde yoksa state e eklenir.

gelin bunu kullanalım

``` Javascript
firstMethods (){
    Reax.updateState({
        title: 'Javascript',
        message: 'Hello Reax'
    })
    console.log(Reax.state)
    console.log(Reax.historyData)
}
```

Yukarıdaki kodda state içerisinde zaten bulunan title değişkeninin değerini "javascript" yapdık
fakat state içerisinde message diye bir değişken olmadığı için
state e message değişkenini ekledik.

#### sonuç :
``` javascript
 > state: {
   title: 'Javascript',
   message: 'Hello Reax'
}

> historyData: [
   { history: 'update = title: Javascript' },
   { history: 'add = message: Hello Reax' }
]
```


# removeState([])

Peki state den bir değişken silmek istersek? Bunuda 
``` javascript 
removeState([])
``` 
fonksiyonu ile
yapcağız.
removeState() içerisine bir array değeri alır. Bu array in içerisine state den silmek istediğiniz
değişkenlerin isimleri girilir ve remoeState state den tek tek o değişkenleri
siler.
Gelin kullanalım.


``` Javascript
firstMethods (){
    Reax.updateState({
        title: 'Javascript',
        message: 'Hello Reax'
    })
    Reax.removeState([
        'message'
    ])
    console.log(Reax.state)
    console.log(Reax.historyData)
} 
```

# sonuç :

``` javascript
> state: {
   title: 'Javascript',
}

> historyData: [
   { history: 'update = title: Javascript' },
   { history: 'add = message: Hello Reax' }
   { history: 'remove = message: Hello Reax' }
]
```

Bu şekilde removeState([]) kullanarak state den veri silebiliriz ve tabiki buda geçmişe kaydedilir.

# viewStateDetail()

Eğer state de kaçtane string değişken var?
kaçtane number ve boolean değişken var bunları görmek istersek

``` javascript
viewStateDetail()
```
fonksiyonunu kullanıyoruz.

Gelin bu fonksiyonu kullnalaım
``` javascript
const Reax = new Reax({}, {
    firedBefore (){
        viewStateDetail()
    }
}, true)
```

sadece fonksiyonun ismini yazdırmanız yeterli sonuç konsola otomatik yazdırılır.

# sonuç :

``` javascript

> allStateLength: 1
> String: {title: 'Javascript'}
> Number: {},
> Boolean: {}
*/
```

-----------------------------------------------------------------------------------------------------

# ÖRNEK UYGULAMA

Haydi gelin Reax state kullanarak bir uygulama yapalım.

Uygulamamızda bir API dan veri çekelim ve bunları ekrana yazdıralım.

Veri çekeceğimiz API adresi:
>https://reqres.in/api/users

#### NOT: Eğer API ve fetch kavramlarını bilmiyorsanız öncelikle bunları öğrenmeniz uygulamayı anlamanız açısında faydalı olur.

#### Uygulamamıza Bootstrap ve önceden yazacağımız birkaç CSS kodu ekleyelim (ve tüm HTML kodu aşağıdadır)
``` html
 <head>
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
   integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <style>
        .card {
            margin: 3rem auto;
            width: 75%;
        }
        .card .card-header img {
            border-radius: 50%;
        }
    </style>
 </head>
<script src="./reax.js"></script>
```


# Uygulamamızı yazdırmaya başlayalım

> Önce bir Reax oluşturuyoruz

``` javascript
 const Reax = new ReaxMain({}, {}, true)
```

> şimdi içerisine bir firedBefore(promise) yazalım
> fakat fetch zaten bize promise yapısı verdiği için
> Tekrar Reax ın promise yapısını kullanmaya gerek yok
> tabi ek işlemler yapmayacaksak

``` javascript
const Reax = new ReaxMain({
   title: 'Reax App - 1'
}, {
    firedBefore (promise){
       fetch('https://reqres.in/api/users')
           .then(res => res.json())
           .then(data => {
               Reax.updateState({
                   db: data.data
                })
            })
    }
}, true)
```

Şu ana kadar state e API dan çekdiğimiz kullanıcı verilerini db değişkenine yükledik.
Şimdi HTML dosyamıza bir etiket koyalım.
Bu etiketin içerisine tüm kullnıcılarımızı yazdıracağız.

``` html
<div id=users ></div>
```

Kullanıcıların herbirini tek tek yazdırmak için map() fonksiyonunu kullanacağız.
Eğer state den db yi konsola yazdırırsanız db nin bir array olduğunu göreceksiniz.

Şimdi gelin kullanıcıları innerHTML ile tek tek ekleyelim

``` javascript
const Reax = new ReaxMain({
   title: 'Reax App - 1'
}, {
    firedBefore (promise){
       fetch('https://reqres.in/api/users')
           .then(res => res.json())
           .then(data => {
                Reax.updateState({
                   db: data.data
               })
           })
           .then(local => {
               Reax.state.db.map(user => {
                   document.getElementById('users').innerHTML += (`
                       <div class=card>
                           <div class=card-header>
                               <img src=${user.avatar} />
                           </div>
                           <div class=card-body>
                                <ul>
                                    <li>Key: ${user.id}</li>
                                   <li>first name: ${user.first_name}</li>
                                   <li>last name: ${user.last_name}</li>
                                   <li>email: ${user.email}</li>
                               </ul>
                           </div>
                       </div>
                   `) // NOT: burada '' değil `` kullandım
               })
           })
    }
}, true)
```

Burada Herbir kullanıcı için users div'ine bir card classına sahip başka divler ekledik.

Ve küçük uygulamamız bitti.
Uygulamada API dan bir veri çekdik ve bu verinin içerisinde ki kulanıcıların
herbirini ekrana yazdırdık.

#### Bağzı javascript fonksiyonları anlatmadım çünki bu tutorial JAvascript tutorial ı değil düz Javascript dosyaları için yazılmış bir kütüphane olan Reax ın tutorialıdır.



# Hakkımda

Ben Polat Poyraz 1 buçuk yıllık web front end developer ım.
Bu kütüphaneyi yazmamdaki amaç ortaya iyi kötü birşeyler koyabilmek ve ilerde daha iyisini yapdığımda
kendimi gözlemleyebilmek.
Sizlerde böyle şeyler yapıp üstüne koydukca gidin ve ilerde geriye dönüp bakdığınızda
gelişdiğiniz görün bu size iyi bir motivasyon kaynağı olur ve gelişdiğiniz daha net anlarsınız.
iyi günler

# Bildiğim teknolojiler
1. HTML
2. CSS
3. SASS
4. Bootstrap
5. Javascript
6. React.js
7. Next.js

Proje güncellenmeye ve geliştirilmeye açıkdır.

# Reax.js
---
