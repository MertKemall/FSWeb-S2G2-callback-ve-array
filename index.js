const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const EvSahibiFinal = Yillar(fifaData, Finaller).filter(match => match['Home Team Name']);
console.log(EvSahibiFinal);


//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const DeplasmanFinal = Yillar(fifaData, Finaller).filter(match => match['Away Team Name']);
console.log(DeplasmanFinal);


//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const EvsahibiFinall=Yillar(fifaData,Finaller).filter(match=>match['Home Team Goals']);
console.log(EvsahibiFinall);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const DeplasmanFinalll=Yillar(fifaData,Finaller).filter(match=>match['Away Team Goals']);
console.log(DeplasmanFinalll);
//(e) 2014 Dünya kupası finali kazananı*/
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar).filter(match=>match.Year===2014));
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifadata) {
	const newDizi = fifadata.filter(match => match.Stage === 'Final');
	return newDizi;
  }
  
//console.log(Finaller(fifaData));


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

	function Yillar(fifaData, FinallerFonk) {
		const finaller = FinallerFonk(fifaData);
		const years = finaller.map(match => match.Year);
		return years;
	  }
	  
	  console.log(Yillar(fifaData,Finaller));


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 
	function Kazananlar(fifaData, FinallerFonk) {
		const FinallerKazananlar = FinallerFonk(fifaData);
		const kazanan=[];
		FinallerKazananlar.forEach(finalMatch => {
		  if (finalMatch['Home Team Goals'] > finalMatch['Away Team Goals']) {
			kazanan.push(finalMatch['Home Team Name']);
		  } else if (finalMatch['Home Team Goals'] < finalMatch['Away Team Goals']) {
			kazanan.push(finalMatch['Away Team Name']);
		  }
		  else if(finalMatch['Home Team Goals'] === finalMatch['Away Team Goals']){
			if(finalMatch['Half time Home  Goals'] === finalMatch['Half time Away  Goals']){
				kazanan.push(finalMatch['Win conditions']);
			}
			else if(finalMatch['Half time Home  Goals'] > finalMatch['Half time Away  Goals']){
				kazanan.push(finalMatch['Home Team Name']);
			}
			else{
				kazanan.push(finalMatch['Away Team Name']);
			}
		  }
		});
	    return kazanan;
	  }
	  console.log(Kazananlar(fifaData,Finaller));



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/
function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
	const yillar = Yillar(fifaData, Finaller);
	const kazananlar = Kazananlar(fifaData, Finaller);
	const newDizi=[];
  
	for (let i = 0; i < kazananlar.length; i++) {
	  const yil = yillar[i];
	  const kazanan = kazananlar[i];
	  newDizi.push((`${yil} yılında, ${kazanan} dünya kupasını kazandı!`));
	}
	return newDizi;
  }
  
  
  console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));
  


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
	let toplamsayısı=Finaller.reduce((toplamgol,match)=>toplamgol+ match["Home Team Goals"]+match["Away Team Goals"],0);
	return (toplamsayısı/Finaller.length).toFixed(2);
  }
  
  
  
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/
let kısaltmalar = Finaller(fifaData).reduce((total, mac) => {
	if (!total.includes(mac["Home Team Initials"])) {
	  total.push(mac["Home Team Initials"]);
	}
	if (!total.includes(mac["Away Team Initials"])) {
	  total.push(mac["Away Team Initials"]);
	}
	return total;
  }, []);
  

function UlkelerinKazanmaSayilari(fifadata,kısaltmalar) {
	let deger = Finaller(fifadata).reduce((total,mac)=>{
		let kazanan;
		if(mac["Home Team Goals"]>mac["Away Team Goals"]){
			kazanan=mac["Home Team Initials"]
		}
		else{
			kazanan=mac["Away Team Initials"]
		}
		if(total[kazanan]==undefined){
			total[kazanan]=1;
		}
		else{
			total[kazanan]+=1;
		}
		return total;
	},[]);
	return deger;
}

  console.log(UlkelerinKazanmaSayilari(fifaData,kısaltmalar));
  
  


/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
