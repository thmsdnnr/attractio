window.onload = function() {
const authors=[
    "Adam Lindsay Gordon",
    "Alan Seeger",
    "Alexander Pope",
    "Algernon Charles Swinburne",
    "Ambrose Bierce",
    "Amy Levy",
    "Andrew Marvell",
    "Ann Taylor",
    "Anne Bradstreet",
    "Anne Bronte",
    "Anne Killigrew",
    "Anne Kingsmill Finch",
    "Annie Louisa Walker",
    "Arthur Hugh Clough",
    "Ben Jonson",
    "Charles Kingsley",
    "Charles Sorley",
    "Charlotte Bronte",
    "Charlotte Smith",
    "Christina Rossetti",
    "Christopher Marlowe",
    "Christopher Smart",
    "Coventry Patmore",
    "Edgar Allan Poe",
    "Edmund Spenser",
    "Edward Fitzgerald",
    "Edward Lear",
    "Edward Taylor",
    "Edward Thomas",
    "Eliza Cook",
    "Elizabeth Barrett Browning",
    "Emily Bronte",
    "Emily Dickinson",
    "Emma Lazarus",
    "Ernest Dowson",
    "Eugene Field",
    "Francis Thompson",
    "Geoffrey Chaucer",
    "George Eliot",
    "George Gordon, Lord Byron",
    "George Herbert",
    "George Meredith",
    "Gerard Manley Hopkins",
    "Helen Hunt Jackson",
    "Henry David Thoreau",
    "Henry Vaughan",
    "Henry Wadsworth Longfellow",
    "Hugh Henry Brackenridge",
    "Isaac Watts",
    "James Henry Leigh Hunt",
    "James Thomson",
    "James Whitcomb Riley",
    "Jane Austen",
    "Jane Taylor",
    "John Clare",
    "John Donne",
    "John Dryden",
    "John Greenleaf Whittier",
    "John Keats",
    "John McCrae",
    "John Milton",
    "John Trumbull",
    "John Wilmot",
    "Jonathan Swift",
    "Joseph Warton",
    "Joyce Kilmer",
    "Julia Ward Howe",
    "Jupiter Hammon",
    "Katherine Philips",
    "Lady Mary Chudleigh",
    "Lewis Carroll",
    "Lord Alfred Tennyson",
    "Louisa May Alcott",
    "Major Henry Livingston, Jr.",
    "Mark Twain",
    "Mary Elizabeth Coleridge",
    "Matthew Arnold",
    "Matthew Prior",
    "Michael Drayton",
    "Oliver Goldsmith",
    "Oliver Wendell Holmes",
    "Oscar Wilde",
    "Paul Laurence Dunbar",
    "Percy Bysshe Shelley",
    "Philip Freneau",
    "Phillis Wheatley",
    "Ralph Waldo Emerson",
    "Richard Crashaw",
    "Richard Lovelace",
    "Robert Browning",
    "Robert Burns",
    "Robert Herrick",
    "Robert Louis Stevenson",
    "Robert Southey",
    "Robinson",
    "Rupert Brooke",
    "Samuel Coleridge",
    "Samuel Johnson",
    "Sarah Flower Adams",
    "Sidney Lanier",
    "Sir John Suckling",
    "Sir Philip Sidney",
    "Sir Thomas Wyatt",
    "Sir Walter Raleigh",
    "Sir Walter Scott",
    "Stephen Crane",
    "Thomas Campbell",
    "Thomas Chatterton",
    "Thomas Flatman",
    "Thomas Gray",
    "Thomas Hood",
    "Thomas Moore",
    "Thomas Warton",
    "Walt Whitman",
    "Walter Savage Landor",
    "Wilfred Owen",
    "William Allingham",
    "William Barnes",
    "William Blake",
    "William Browne",
    "William Cowper",
    "William Cullen Bryant",
    "William Ernest Henley",
    "William Lisle Bowles",
    "William Morris",
    "William Shakespeare",
    "William Topaz McGonagall",
    "William Vaughn Moody",
    "William Wordsworth"
  ];
  let G = {WIDTH:600, HEIGHT: 700, PADDING: 40};
  G.positions={};
  let fridge=document.querySelector('div#fridge');
  const words="abattu,abature,abatures,abaxial,abaxile,abaya,abayas,abb,abba,abbacies,abbacy,abbas,abbatial,abbe,abbed,abbes,abbess,abbesses,abbey,abbeys,abbot,abbotcies,abbotcy,abbots,abbotship,abbotships,abbreviate,abbreviated,abbreviates,abbreviating,abbreviation,abbreviations,abbreviator,abbreviators,abbreviatory,abbreviature,abbreviatures,abbs,abcee,abcees,abcoulomb,abcoulombs".split(",");

  // target elements with the "draggable" class
  function setInteractions() {
  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: false,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: dragEndListener
    });
}
    function randomIn(lo, hi) {
      return Math.floor(Math.random()*(hi-lo))+lo;
    }

    function parseWords(d) {
      d=d.map(e=>e.lines.join(" "))
          .reduce((a,b)=>a.concat(b),[])
          .join(" ").split(" ")
          .filter(e=>e.length&&!e.match(/[^a-z]/gi));
      d=d.filter((e,idx)=>idx===d.lastIndexOf(e)).map(e=>e.replace(/[^a-z]gi/,''));
      let dict={};
      d.forEach(w=>{
        w=w.toLowerCase();
        dict[w] ? dict[w]++ : dict[w] = 1;
      });
      let sorted=[];
      Object.keys(dict).forEach(key=>{
        sorted.push([dict[key], key]);
      });
      sorted=sorted.sort((a,b)=>b[0]-a[0]);
      G.words=sorted;
      let adverbs=d.filter(e=>e.slice(e.length-2)==='ly');
      let short=d.filter(e=>(e.length<5));

      let random=[];
      console.log(adverbs, d);
      for (var i=0;i<15;i++) {
        if (adverbs.lenghth) { random.push(adverbs[randomIn(0,adverbs.length-1)]); }
        random.push(d[randomIn(0,d.length-1)])
        random.push(d[randomIn(0,d.length-1)])
      }
      random.join(",");
      populateRandomWords(random);
    }

    function fetchLines(author) {
      let URL='http://crossorigin.herokuapp.com/http://poetrydb.org/author/'+author+'/lines';
      fetch(URL).then(res=>{
        console.log(res);
        if (res.status!==404) { return res.json(); }
      }).then(d=>{
        console.log('data',d);
        parseWords(d);
      }).catch(err=>{
        console.log(err);
      });
    }

    function dragMoveListener (event) {
      event.stopPropagation();
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);

      target.style.backgroundColor = 'black';
      target.style.color = 'white';
    }
//shift click to delete
//button for new words
    function liftDivUp(elevate, sinkArr) {
      if (!sinkArr.length) { return false; }
      console.log(elevate, sinkArr, 'liftdivup');
      let liftZ=Number(elevate.style.zIndex);
      let idxes=sinkArr.map(e=>Number(e.style.zIndex));
      let max=Math.max(...idxes);
      console.log('max', max, typeof max)
      elevate.style.zIndex=max+1;
      // elevate.style.zIndex=liftZ++;
      sinkArr.forEach(e=>{
        e.style.zIndex=Math.max(0,Number(e.style.zIndex)-1)
      });
      console.log(idxes, Math.max(...idxes));
      console.log(elevate.style.zIndex)
    }

    function dragEndListener (event) {
      event.stopPropagation();
      event.target.style.backgroundColor = 'white';
      event.target.style.color = 'black';
      let lastZ=Number(event.target.style.zIndex);
      event.target.style.zIndex=lastZ++;
      let thisPos=event.target.getBoundingClientRect();
      G.positions[event.target.id]=thisPos;
      let collidingRects=[];
      Object.keys(G.positions).filter(key=>key!==event.target.id).forEach(key=>{
        if (calculateCollisions(thisPos,G.positions[key])) {
          console.log(key);
          collidingRects.push(document.getElementById(key));
        }
      });
      console.log(collidingRects);
      if (collidingRects.length) { liftDivUp(event.target, collidingRects); }
      console.log(collidingRects.map(e=>e.innerHTML));
    }

    window.dragMoveListener = dragMoveListener;

    function addWordListener(w) {
      document.getElementById(w).addEventListener('click', handleDelete);
      document.getElementById(w).addEventListener('dblclick', handleModify);
    }

    function handleModify(e) {
      let word=e.target.innerHTML;
      let eleWidth=e.target.getBoundingClientRect().width;
      e.target.innerHTML='';
      let I=document.createElement('input');
      I.value=word;
      I.type='text';
      e.target.appendChild(I);
      I.focus();
      I.classList.add('newWord');
      I.id=e.target.id+'_modify';
      I.style.width=eleWidth;
      e.target.style.zIndex=1;
      e.target.style.backgroundColor = 'white';

      I.addEventListener('keypress', (k) => {
        if (k.keyCode===13) { I.blur(); }
      });
      I.addEventListener('blur', (inputE) => {
        if (I.value.length) {
          e.target.innerHTML=I.value;
        } else { fridge.removeChild(e.target); }
      });
    }

    function handleDelete(e) {
      if (e.shiftKey) {
        e.target.removeEventListener('click', handleDelete);
        fridge.removeChild(e.target);
        delete G.positions[e.target.id];
      }
    }

    function calculateCollisions(rect1, rect2) {
      if (rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.height + rect1.y > rect2.y
        ) { return rect2; }
      return false;
    }

  function populateRandomWords(words) {
    G.positions={};
    fridge.innerHTML='';
    let lastID=null;
    let thisX, thisY;
    let INNERPAD=90;
    let XPAD=280;
    let YPAD=40;
    let cX=0;
    let cY=0;
    words.forEach((w,idx)=>{
      let d=document.createElement('div');
      d.innerHTML=w;
      d.id='div-'+idx;
      fridge.appendChild(d);
      if (idx!==0) { cX=G.positions[lastID].right-XPAD; }
      if (cX>G.WIDTH-INNERPAD) {
        cX=0;
        cY+=YPAD;
      } else { ; }
      d.dataset.x=cX;
      d.dataset.y=cY;
      addWordListener(d.id);
      let angle=randomIn(-3,5);
      d.style.transform='translate(' + d.dataset.x + 'px, ' + d.dataset.y + 'px)';
      d.dataset.angle=angle;
      d.style.transform+='rotateZ('+angle+'deg)';
      d.classList.add('word');
      d.classList.add('draggable');
      lastID=d.id;
      G.positions[d.id]=d.getBoundingClientRect();
    });
    setInteractions();
  }

  function savePositions() {
    let data=[];
    document.querySelectorAll('div.word').forEach(w=>{
      data.push({
        id:w.id,
        word:w.innerHTML,
        transform:w.style.transform,
        x:Math.max(0,w.dataset.x),
        y:Math.max(0,w.dataset.y),
        zIdx:w.style.zIndex,
        color:w.style.color,
        bgColor:w.style.backgroundColor
      });
    });
    localStorage.setItem('positions', JSON.stringify(data));
  }

  function sortFn(a,b) {
    if (a>b) { return 1; }
    else if (a<b) { return -1; }
    else { return 0; }
  }

  function printPoem() {
    //sort by xPos, yPos, infer rows, sort row by tiebreaker
    let P=G.positions;
    let sorted=Object.keys(P).map(key=>[P[key].x,P[key].y,P[key].x+P[key].y,key])
    .sort((a,b)=>sortFn(a[0],b[0])).sort((a,b)=>sortFn(a[1],b[1]));
    let yValues=sorted.map(e=>e[1]);
    let yJumps=yValues.map((j,idx)=>(idx>0&&idx<yValues.length) ? {jump:yValues[idx]-yValues[idx-1],idx:idx} : null).filter(e=>e);
    let avgYJump=yJumps.map(e=>e.jump).reduce((a,b)=>a+=b,0)/yJumps.length;
    let stdDevY=Math.sqrt(yJumps.map(e=>Math.pow((e.jump-avgYJump),2)).reduce((a,b)=>a+=b,0)/(yJumps.length-1));
    let nL=[0].concat(yJumps.filter(e=>e.jump>=avgYJump+stdDevY).map(e=>e.idx));
    let rows=[];
    console.log(sorted);
    rows=nL.map((e,idx)=>sorted.slice(e,nL[idx+1])).map(r=>r.sort((a,b)=>sortFn(a[2],b[2])));
    let text=rows.map(e=>e.map(el=>document.getElementById(el[3]).innerHTML).join(" "));
    console.log(text.join("\n"));
  }

  function loadPositions() {
    let D=JSON.parse(localStorage.getItem('positions'));
    console.log(D);
    G.positions={};
      fridge.innerHTML='';
      D.forEach(div=>{
        let q=document.createElement('div');
        q.id=div.id;
        q.innerHTML=div.word;
        q.dataset.x=div.x!==undefined ? div.x : 0;
        q.dataset.y=div.y!==undefined ? div.y : 0;
        q.style.transform='translate(' + q.dataset.x + 'px, ' + q.dataset.y + 'px)';
        q.style.zIndex=div.zIdx;
        q.style.color=div.color;
        q.style.backgroundColor=div.bgColor;
        if (q.dataset.angle) { q.style.transform+='rotateZ('+angle+'deg)'; }
        q.classList.add('word');
        q.classList.add('draggable');
        fridge.appendChild(q);
        G.positions[q.id]=q.getBoundingClientRect();
        addWordListener(q.id);
      });
      console.log(G.positions);
      printPoem();
      setInteractions();
  }

  document.querySelector('button#poemify').addEventListener('click', printPoem);
  document.querySelector('button#save').addEventListener('click', savePositions);
  document.querySelector('button#load').addEventListener('click', loadPositions);
  document.querySelector('button#newWord').addEventListener('click', ()=>addNewWord({wSource:'list'}));
  document.querySelector('form#newWord').addEventListener('submit', addNewWord);

  function addNewWord(e) {
    let newWord;
    let numWords=document.querySelectorAll('div.word').length;
    if (!e.wSource) {
      e.preventDefault();
      newWord=document.querySelector('input#newWord');
      if (newWord.value.length) {
        let d=document.createElement('div');
        d.innerHTML=newWord.value;
        d.id='div-'+numWords;
        d.dataset.x=0;
        d.dataset.y=0;
        d.style.transform ='translate(' + d.dataset.x+ 'px, ' + d.dataset.y + 'px)';
        d.classList.add('word');
        d.classList.add('draggable');
        fridge.appendChild(d);
        d.style.zIndex=1;
        d.style.backgroundColor='white';
        addWordListener(d.id);
        newWord.value='';
        newWord.blur();
      }
    }
    else if (G.words) {
      newWord=G.words.shift()[1];
      let d=document.createElement('div');
      d.innerHTML=newWord;
      d.id='div-'+numWords;
      d.dataset.x=0;
      d.dataset.y=0;
      d.style.transform ='translate(' + d.dataset.x+ 'px, ' + d.dataset.y + 'px)';
      d.classList.add('word');
      d.classList.add('draggable');
      d.style.backgroundColor='white';
      d.style.zIndex=1;
      fridge.appendChild(d);
      addWordListener(d.id);
    }
  else { return false; }
    setInteractions();
  }

  function poetSelect(e) {
    fetchLines(e.target.value);
  }

  function populateSelector() {
    let S=document.querySelector('select#poet');
    authors.forEach(a=>{
      let O=document.createElement('option');
      O.value=a;
      O.innerHTML=a;
      S.appendChild(O);
    });
    S.addEventListener('change', poetSelect);
  }

  populateRandomWords(words);
  populateSelector();
  // fetchLines('Walt Whitman');
  // listenToWords();
}
