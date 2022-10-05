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

let getCache = {};

let get = async url => {
  if (getCache[url]) { return getCache[url]; }
  let got = await $.get({ url, dataType: 'text' });
  getCache[url] = got;
  return got;
}

let go = (() => {

  let language = localStorage.comparisonsLanguage || 'en';
  let doNotResetMeta;

  let meta, exp;
  async function addExplanationsToMeta() {
    await get('/explanations-sv.md');
    await get('/explanations-en.md');
    let x = await get(`/explanations-${language}.md`);
    exp = x.split(/\n# \d+\n/);
    exp.shift();
    document.title = exp[10];
    meta = {
      'Java vs. C# - BMI-calc, console app': [
        'BMI-calc, Java, console app',
        'BMI-calc, C#, console app',
        exp[0]
      ],
      'Java vs. JavaScript - BMI-calc, console app': [
        'BMI-calc, Java, console app',
        'BMI-calc, JavaScript, long/OOP, console app',
        exp[1]
      ],
      'JavaScript vs. Python - BMI-calc, console app (long/OOP)': [
        'BMI-calc, JavaScript, long/OOP, console app',
        'BMI-calc, Python, long/OOP, console app',
        exp[2]
      ],
      'JavaScript vs. Python - BMI-calc, console app (short)': [
        'BMI-calc, JavaScript, short, console app',
        'BMI-calc, Python, short, console app',
        exp[3]
      ],
      'JavaScript vs. Python - BMI-calc, GUI (Graphical User Interface)': [
        'BMI-calc, JavaScript, GUI',
        'BMI-calc, Python, GUI',
        exp[4]
      ],
      'Java vs. C# - To Do List, console app': [
        'To Do List, Java, console app',
        'To Do List, C#, console app',
        exp[12]
      ],
      'JavaScript vs. Python - To Do List, console app': [
        'To Do List, JavaScript, console app',
        'To Do List, Python, console app',
        exp[13]
      ],
    };
  }

  let codeExamples = {
    'To Do List, Java, console app': '/examples/todo-list.java',
    'To Do List, C#, console app': '/examples/todo-list.cs',
    'To Do List, JavaScript, console app': '/examples/todo-list.cjs',
    'To Do List, Python, console app': '/examples/todo-list.py',
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
    'BMI-calc, Python, GUI, style.py': '/examples/bmi-with-gui-python/style.py'
  }

  let originalCodeExamples = Object.assign({}, codeExamples);

  let playCodeExamples = [
    'https://replit.com/@ThomasFrank4/To-Do-list-console-app-Java#Main.java',
    'https://replit.com/@ThomasFrank4/To-Do-list-console-app-C#Main.cs',
    'https://replit.com/@ThomasFrank4/To-Do-list-console-app-JS#index.js',
    'https://replit.com/@ThomasFrank4/To-Do-list-console-app-Python#main.py',
    'https://replit.com/@ThomasFrank4/Java-BMI-calc#Main.java',
    'https://replit.com/@ThomasFrank4/C-BMI-calc#main.cs',
    'https://replit.com/@ThomasFrank4/JS-BMI-calc-longOOP#index.js',
    'https://replit.com/@ThomasFrank4/JS-BMI-calc-longOOP-no-semis#index.js',
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
    if (lang === 'js') {
      // html highlite inside template literals in js if /*html*/ or html before them
      code = code.replace(/(html\S*`)([^`]*)/, '$1__html_template__$2__html_template__');
      code = code.split('__html_template__');
    }
    else {
      code = [code];
    }
    let c = '';
    // highlite using Prism
    let counter = 0;
    for (let x of code) {
      let lange = counter % 2 == 0 ? lang : 'html';
      c += Prism.highlight(x, Prism.languages[lange], lange);
      counter++;
    }
    // fix for line numbers
    if (c.split('\n').length > 2) {
      c = '<ol><li><div>' + c.replace(/\n */g, x => `</div></li><li style="padding-left:${x.slice(1).length * 9}px"><div><span class="cspaces">${x.slice(1) || ' '}</span>`) + '</div></li></ol>';
    }
    return c;
  }

  async function start() {
    await addExplanationsToMeta();
    $('body').empty();
    $('body').append('<div class="holder"></div><div class="examples">');
    for (let [key, val] of Object.entries(codeExamples)) {
      let lang = val.split('.').pop();
      let code = await get(val);
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
    // add choosers
    addChooser(1);
    addChooser(0);
    addCompareChooser();
  }

  function addChooser(chosen) {
    // reorder ToDo examples
    let codeExs = Object.assign({}, codeExamples);
    for (let key in codeExs) {
      if (key.includes('To Do')) {
        let val = codeExs[key];
        delete codeExs[key];
        codeExs[key] = val;
      }
    }
    let chooser = $(`
    <div class="chooser">
      <select>
      ${Object.keys(codeExs).map((x, i) => `<option ${i == chosen ? ' selected' : ''}>${x}</option>`).join('')}
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
      !doNotResetMeta && $('.meta').val(exp[11]).trigger('change');
    });
    chooser.find('select').trigger('change');
  }

  function addCompareChooser() {
    let select = '<select class="meta">';
    select += `<option>${exp[11]}</option>`;
    let selectedComparison = localStorage.selectedComparison || Object.keys(meta)[0];
    for (let key in meta) {
      select += `<option ${selectedComparison === key ? ' selected' : ''}>${key}</option>`
    }
    select += '</select>';
    select = $(select);
    $('.holder').append('<div class="headit"></div>');
    $('.holder .headit').append(`<h1>${exp[6]}</h1>`);
    $('.holder .headit').append(`<div class="explain intro"><i>${exp[7]}</i></div>`);
    $('.holder .headit').append(`<div class="intro">${exp[8]}</div>`);
    $('.holder .headit').append(/*html*/`
    <div class="language-switch">
      <img width="30" src="/us-icon.png">
      <label class="form-switch">
        <input type="checkbox">
        <i></i>
      </label>
        <img width="30" src="/sv-icon.png">
    </div>
  `);
    $('.holder').append(select);
    $('.holder').append('<div class="desc"></div>');
    select.on('change', () => {
      let selected = meta[select.val()];
      if (!selected) {
        $('.holder .desc').html(marked.parse(''));
        return;
      }
      let [choice1, choice2, desc] = selected;
      localStorage.selectedComparison = select.val();
      doNotResetMeta = true;
      $('option').each(function () { $(this).prop('disabled', false) });
      $('.chooser select').first().val(choice1).trigger('change');
      $('.chooser select').last().val(choice2).trigger('change');
      $('.holder .desc').html(marked.parse(desc));
      $('.init-in-py em').html('__init__');
      doNotResetMeta = false;
    });
    select.trigger('change');
    let cbox = $('.language-switch [type="checkbox"]');
    cbox.prop('checked', localStorage.comparisonsLanguage === 'sv');
    cbox.on('change', function () {
      let c = $(this).prop('checked');
      localStorage.comparisonsLanguage = c ? 'sv' : 'en';
      setTimeout(() => go(), c ? 0 : 250);
    });
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

    y2el.prepend('<h2>BMI-calc, JavaScript, GUI</h2>');
    y2el.find('h3').first().append(', app.js: Huvudprogram');
    y1el.prepend('<h2>BMI-calc, Python, GUI</h2>');
    y1el.find('h3').first().append(', main.py: Huvudprogram');
    y1el.find('h3').add(y2el.find('h3')).each(function () {
      $(this).html($(this).html().split(', ').pop());
    });

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
    /*html*/`<div class="explain">
      ${marked.parse(exp[5])}
    </div>`
    );

    y1el.append('<br><h3>' + exp[9] + '</h3><br><a class="img-link" target="_blank" href="https://replit.com/@ThomasFrank4/Python-BMI-calc-GUI#main.py"><img src="/bmi-gui-python.jpg" style="width:40vw;display:inline-block"></a>');
    y2el.append('<br><h3>' + exp[9] + '</h3><br><a class="img-link" target="_blank" href="https://replit.com/@ThomasFrank4/BMI-calc-JavaScript-GUI#index.html"><img src="/bmi-gui-js.jpg" style="width:40vw;display:inline-block"></a>');

    let h3_1 = y1el.find('h3:contains("style.py")');
    let h3_2 = y2el.find('h3:contains("style.css")');
    let spacer = $('<div class="style-list-spacer-py"></div>');
    h3_1.before(spacer);
    setInterval(() => {
      let [one, two] = [h3_2.offset().top, h3_1.offset().top];
      let diff = one - two;
      (!one || !two) && (diff = 0);
      if (!diff) { return; }
      spacer.css({ height: 0, marginTop: 0 });
      diff = h3_2.offset().top - h3_1.offset().top;
      diff > 0 && spacer.css({ height: diff });
      diff < 0 && spacer.css({ marginTop: diff });
    }, 1000);

  }

  start();

});

go();