import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import { marked } from 'marked';
import $ from 'jquery';

window.Prism = window.Prism || {};
window.Prism.manual = true;

let doNotResetMeta;

let meta = {
  'Java vs. C# - BMI-calc, console app': [
    'BMI-calc, Java, console app',
    'BMI-calc, C#, console app',
    `**Java** (1994) och **C#** (2000) är i grunden mycket snarlika. De är båda hårt typade kompilerade språk och har klassbaserad OOP som gemensam utgångspunkt.\n\nMicrosoft designade **C#** som ett direkt svar på, och för att konkurrera med, **Java**. Då de hade något att jämföra med blev vissa saker lite bättre/mindre verbosa.\n\n*De här språken ger en säker, men lite stel, kostym för hur man bör koda.* 👔`
  ],
  'Java vs. JavaScript - BMI-calc, console app': [
    'BMI-calc, Java, console app',
    'BMI-calc, JavaScript, long/OOP, console app',
    '**Java** (Sun, 1994) och **JavaScript** (Netscape, 1994) är ganska olika språk - trots det gemensamma "*Java*" i namnet som kommer från att *Sun* och *Netscape* hade ett affärssamarbete och tänkte att det skulle vara smart att marknadsföra **JavaScript** som lillebror till **Java**.\n\n**JavaScript** är ett löst typat språk och hade ursprungligen ingen klassyntax.\n\nSedan länge (2015) finns dock klasser på plats i språket och vill man kan man skriva det väldigt traditionellt och Java-likt, minus datatypsdeklarationer, vilket vi har gjort här.\n\n**Notera**: I JavaScript heter konstruktorn alltid *constructor* oavsett klassnamn och **this** är obligatoriskt för att nå klassmedlemmar (fält och metoder).'
  ],
  'JavaScript vs. Python - BMI-calc, console app (long/OOP)': [
    'BMI-calc, JavaScript, long/OOP, console app',
    'BMI-calc, Python, long/OOP, console app',
    '**JavaScript** (1994) och **Python** (1991) är båda löst typade språk som kan skrivas klassbaserat, om man vill. Här gör vi det, fast det blir något längre kod än om vi skulle strunta i klasserna.\n\n**Notera:**\n* I **JavaScript** använder vi *this.methodName* för att referera till metoder i klassen. I **Python** använder vi istället *self.methodName*.\n* I **Python** måste vi låta alla metoder i klassen ta emot *self* som ett argument, men utelämnar detta argument när vi anropar dem.\n* Konstruktorn i en klass heter *constructor* i **JavaScript** och *__init__* i **Python**\n* I **Python** skriver vi *inte* **new** framför klassnamnet när vi skapar en ny instans av klassen.\n\nMedan **JavaScript** har en grundsyntax med curly-brackets/måsvingar för programblock, semi-kolon för radavslut (optional/om man vill) osv. som liknar **Java** och **C#**, väljer **Python** att istället använda indrag för att skilja programblock åt.'
  ],
  'JavaScript vs. Python - BMI-calc, console app (short)': [
    'BMI-calc, JavaScript, short, console app',
    'BMI-calc, Python, short, console app',
    '**JavaScript** (1994) och **Python** (1991) är båda löst typade språk och har gemensamt att de är lätt att "leka" med datatyper i dem, och de kräver minimial syntax för att skapa listor, hashmaps etc.\n\nMedan **JavaScript** har en grundsyntax med curly-brackets/måsvingar för programblock, semi-kolon för radavslut osv. som liknar **Java** och **C#**, väljer **Python** att istället använda indrag för att skilja programblock åt.\n\nSpråken kan båda användas såväl med som utan klasser - här ett exempel utan klasser i bägge språken, vilket ger kortare och mer kompakt kod.\n\n(**Python** har på gott och ont lite större behov av typomvandlingar än JavaScript.)\n\n*Ingen finkostym behövs, fullt ös!* 🎉'
  ],
  'JavaScript vs. Python - BMI-calc med GUI/grafiskt gränssnitt': [
    'BMI-calc, JavaScript, GUI',
    'BMI-calc, Python, GUI',
    '**JavaScript** är ursprungligen designat för att köra i webbläsare och komplettera **HTML** (ett märkspråk för innehåll) och **CSS** (ett regelbaserat språk för styling av element på webbsidor). Således är det naturligt att grafiska gränssnitt för JavaScript-program skapas med **HTML** och **CSS**.\n\n**Python** har **TKinter** som sitt standardverktyg för grafiska gränssnitt. Det är ett bibliotek byggt ovanpå **TK** (ett open-source plattformsoberoende verktyg) som är **widget**-baserat, dvs. det finns olika slags grafiska element (*widgets*) - som *labels/text*, *input-fält* m.m. att välja mellan för att bygga sitt GUI.\n\nDetta gör att angreppssättet för att bygga grafiska gränssnitt är ganska olika mellan språken. Trots det går det att skapa ett exempel, som det här, där koden är jämförbar i struktur och längd.\n\n*4 kilobyte kod x 2 borde vara nog för alla?* 😛'
  ]
}

let codeExamples = {
  'BMI-calc, Java, console app': '/examples/Main.java',
  'BMI-calc, C#, console app': '/examples/c-sharp/Program.cs',
  'BMI-calc, JavaScript, long/OOP, console app': '/examples/bmi-long.cjs',
  'BMI-calc, JavaScript, long/OOP, no semi-colons, console app': '/examples/bmi-long-no-semis.cjs',
  'BMI-calc, Python, long/OOP, console app': '/examples/bmi-long.py',
  'BMI-calc, JavaScript, short, console app': '/examples/bmi-short.cjs',
  'BMI-calc, JavaScript, short, no semi-colons, console app': '/examples/bmi-short-no-semis.cjs',
  'BMI-calc, Python, short, console app': '/examples/bmi-short.py',
  'BMI-calc, JavaScript, GUI': '/examples/bmi-with-gui-js/app.js',
  'BMI-calc, JavaScript, GUI, window-handling.js': '/examples/bmi-with-gui-js/window-handling.js',
  'BMI-calc, JavaScript, GUI, index.html (start)': '/examples/bmi-with-gui-js/index.html',
  'BMI-calc, JavaScript, GUI, style.css': '/examples/bmi-with-gui-js/style.css',
  'BMI-calc, Python, GUI': '/examples/bmi-with-gui-python/main.py',
  'BMI-calc, Python, GUI, window_handling.py': '/examples/bmi-with-gui-python/window_handling.py',
  'BMI-calc, Python, GUI, style.py': '/examples/bmi-with-gui-python/style.py',
}

let originalCodeExamples = Object.assign({}, codeExamples);

let playCodeExamples = [
  'https://replit.com/@ThomasFrank4/Java-BMI-calc#Main.java',
  'https://replit.com/@ThomasFrank4/C-BMI-calc#main.cs',
  'https://replit.com/@ThomasFrank4/JS-BMI-calc-longOOP#index.js',
  'hhttps://replit.com/@ThomasFrank4/JS-BMI-calc-longOOP-no-semis#index.js',
  'https://replit.com/@ThomasFrank4/Python-BMI-calc-longOOP#main.py',
  'https://replit.com/@ThomasFrank4/JS-BMI-calc-short#index.js',
  'https://replit.com/@ThomasFrank4/JS-BMI-calc-short-no-semis#index.js',
  'https://replit.com/@ThomasFrank4/Python-BMI-calc-short#main.py',
  'https://replit.com/@ThomasFrank4/BMI-calc-JavaScript-GUI#app.js',
  'https://replit.com/@ThomasFrank4/BMI-calc-JavaScript-GUI#window-handling.js',
  'https://replit.com/@ThomasFrank4/BMI-calc-JavaScript-GUI#index.html',
  'https://replit.com/@ThomasFrank4/BMI-calc-JavaScript-GUI#style.css',
  'https://replit.com/@ThomasFrank4/Python-BMI-calc-GUI#main.py',
  'https://replit.com/@ThomasFrank4/Python-BMI-calc-GUI#window_handling.py',
  'https://replit.com/@ThomasFrank4/Python-BMI-calc-GUI#style.py'
]

let highlite = (code, lang) => {
  lang = lang === 'cs' ? 'csharp' : lang;
  lang = lang === 'cjs' ? 'js' : lang;
  let c = Prism.highlight(code, Prism.languages[lang], lang);
  if (c.split('\n').length > 2) {
    c = '<ol><li><div>' + c.replace(/\n */g, x => `</div></li><li style="padding-left:${x.slice(1).length * 9}px"><div><span class="cspaces">${x.slice(1) || ' '}</span>`) + '</div></li></ol>';
  }
  return c;
}

async function start() {
  $('body').append('<div class="holder"></div><div class="examples">');
  for (let [key, val] of Object.entries(codeExamples)) {
    let lang = val.split('.').pop();
    let code = await $.get({ url: val, dataType: 'text' });
    codeExamples[key] = { code };
    let bytes = new Intl.NumberFormat('sv-SE').format(code.length)
    codeExamples[key].html = /*html*/`
      <div class="example" data-name="${key}">
        <h3>${key}</h3>
        <p class="info"><span class="lines">Lines of code: ${code.split('\n').length}</span><span class="bytes">Bytes: ${bytes}</span></p>
        <div class="play-holder"><img class="play" src="/play-button.png"></div>
        <code>${highlite(code, lang)}</code>
      </div>
    `;
  }
  for (let code of Object.values(codeExamples)) {
    $('.examples').append(code.html);
  }
  $('body').on('click', '.play', function () {
    let n = $(this).closest('.example, .inner-example').attr('data-name');
    let i = Object.keys(originalCodeExamples).indexOf(n);
    let link = playCodeExamples[i];
    open(link, "");
  });
  hackMultiExample();
  addChooser(1);
  addChooser(0);
  addCompareChooser();
}

function addChooser(chosen) {
  let chooser = $(`
    <div class="chooser">
      <select>
      ${Object.keys(codeExamples).map((x, i) => `<option ${i == chosen ? ' selected' : ''}>${x}</option>`).join('')}
      </select>
    </div>
  `);
  chooser.prependTo('.examples');
  chooser.find('select').on('change', () => {
    $('.example').hide();
    let values = [...$('.chooser select')].map(x => $(x).val());
    for (let value of values) {
      let el = $('.example[data-name="' + value + '"]')
      el.show();
    }
    let el = $('.example[data-name="' + values[0] + '"]');
    el.prependTo('.examples');
    $('.examples').prepend($('.chooser'));
    if (chosen === 0) {
      $('.chooser').last().find('option').each(function () {
        $(this).prop('disabled', $(this).text() === values[0]);
      });
    }
    if (chosen === 1) {
      $('.chooser').first().find('option').each(function () {
        $(this).prop('disabled', $(this).text() === values[1]);
      });
    }
    !doNotResetMeta && $('.meta').val('Välj jämförelse').trigger('change');
  });
  chooser.find('select').trigger('change');
}

function addCompareChooser() {
  let select = '<select class="meta">';
  select += '<option>Välj jämförelse</option>';
  let first = true;
  for (let key in meta) {
    select += `<option ${first ? ' selected' : ''}>${key}</option>`
    first = false;
  }
  select += '</select>';
  select = $(select);
  $('.holder').append('<div class="headit"></div>');
  $('.holder .headit').append('<h1>ironboys språkjämförelser</h1 > ');
  $('.holder .headit').append('<div class="explain intro"><i>Denna utgåva: En BMI-kalkylator i Java, C#, JavaScript och Python...</i></div>');
  $('.holder .headit').append('<div class="intro">Klicka på Play-knapparna för att köra ett stycke kod!</div>');
  $('.holder').append(select);
  $('.holder').append('<div class="desc"></div>');
  select.on('change', () => {
    let selected = meta[select.val()];
    if (!selected) {
      $('.holder .desc').html(marked.parse(''));
      return;
    }
    let [choice1, choice2, desc] = selected;
    doNotResetMeta = true;
    $('option').each(function () { $(this).prop('disabled', false) });
    $('.chooser select').first().val(choice1).trigger('change');
    $('.chooser select').last().val(choice2).trigger('change');
    $('.holder .desc').html(marked.parse(desc));
    doNotResetMeta = false;
  });
  select.trigger('change');
}

function hackMultiExample() {
  let toRemove = [];
  let html = '';
  for (let i = 0; i <= 1; i++) {
    let consume = $('.example').last();
    consume.removeClass('example').addClass('inner-example');
    html = consume.get(0).outerHTML + html;
    toRemove.push(consume.attr('data-name'));
    consume.remove();
  }
  $('.example').last().append(html).prependTo('.examples');
  html = '';
  for (let i = 0; i <= 2; i++) {
    let consume = $('.example').last();
    consume.removeClass('example').addClass('inner-example');
    html = consume.get(0).outerHTML + html;
    toRemove.push(consume.attr('data-name'));
    consume.remove();
  }
  $('.example').last().append(html);
  for (let remove of toRemove) {
    delete codeExamples[remove];
  }

  let y1el = $('[data-name="BMI-calc, Python, GUI"]');
  let y2el = $('[data-name="BMI-calc, JavaScript, GUI"]');
  y1el.show();
  y2el.show();
  let y1 = y1el.find('h3').last().offset().top;
  let y2 = y2el.find('h3').last().offset().top;

  y2el.prepend('<h2>BMI-calc, JavaScript, GUI</h2>');
  y2el.find('h3').first().append(', app.js: Huvudprogram');
  y1el.prepend('<h2>BMI-calc, Python, GUI</h2>');
  y1el.find('h3').first().append(', main.py: Huvudprogram');
  y1el.find('h3').add(y2el.find('h3')).each(function () {
    $(this).html($(this).html().split(', ').pop());
  })
  let diff = y2 - y1 - 18;

  let fixer = x => +$(x).html().split('&nbsp;').join('').split(':').pop();
  let tLinesPy = [...y1el.find('.lines')].map(fixer).reduce((a, b) => a + b);
  let tBytesPy = [...y1el.find('.bytes')].map(fixer).reduce((a, b) => a + b);
  let tLinesJs = [...y2el.find('.lines')].map(fixer).reduce((a, b) => a + b);
  let tBytesJs = [...y2el.find('.bytes')].map(fixer).reduce((a, b) => a + b);
  tBytesJs = new Intl.NumberFormat('sv-SE').format(tBytesJs);
  tBytesPy = new Intl.NumberFormat('sv-SE').format(tBytesPy);
  y1el.find('h2').after(`<p class="info"><span class="lines">Lines of code: ${tLinesPy}</span><span class="bytes">Bytes: ${tBytesPy}</span></p><div class="line"></div>`);
  y2el.find('h2').after(`<p class="info"><span class="lines">Lines of code: ${tLinesJs}</span><span class="bytes">Bytes: ${tBytesJs}</span></p><div class="line"></div>`);

  $('[data-name="BMI-calc, Python, GUI"]').find('h3').last().before(
    /*html*/`<div class="explain" style="height:${diff}px">
      ${marked.parse('*Pythons* **window handling** är aningen längre än *JavaScripts*, då *Python* behöver en funktion för att starta en s.k. *Tkinter event loop* och visa fönstret. Här är koden dessutom versionerad beroende på operativsystem. Å andra sidan behöver **Python** ingen *html*-fil för att starta upp, vilket **JavaScript** i en webbläsare allltid behöver.')}
    </div>`
  );

  y1el.append('<br><h3>Resultat</h3><br><a class="img-link" target="_blank" href="https://replit.com/@ThomasFrank4/Python-BMI-calc-GUI#main.py"><img src="/bmi-gui-python.jpg" style="width:40vw;display:inline-block"></a>');
  y2el.append('<br><h3>Resultat</h3><br><a class="img-link" target="_blank" href="https://replit.com/@ThomasFrank4/BMI-calc-JavaScript-GUI#index.html"><img src="/bmi-gui-js.jpg" style="width:40vw;display:inline-block"></a>');

  y1el.hide();
  y2el.hide();
}


start();