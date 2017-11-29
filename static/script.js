window.onload = function() {
  const BSHOVER='0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
  const BSDEFAULT='0 1px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

  const authors=["Adam Lindsay Gordon","Alan Seeger","Alexander Pope","Algernon Charles Swinburne","Ambrose Bierce","Amy Levy","Andrew Marvell","Ann Taylor","Anne Bradstreet","Anne Bronte","Anne Killigrew","Anne Kingsmill Finch","Annie Louisa Walker","Arthur Hugh Clough","Ben Jonson","Charles Kingsley","Charles Sorley","Charlotte Bronte","Charlotte Smith","Christina Rossetti","Christopher Marlowe","Christopher Smart","Coventry Patmore","Edgar Allan Poe","Edmund Spenser","Edward Fitzgerald","Edward Lear","Edward Taylor","Edward Thomas","Eliza Cook","Elizabeth Barrett Browning","Emily Bronte","Emily Dickinson","Emma Lazarus","Ernest Dowson","Eugene Field","Francis Thompson","Geoffrey Chaucer","George Eliot","George Gordon, Lord Byron","George Herbert","George Meredith","Gerard Manley Hopkins","Helen Hunt Jackson","Henry David Thoreau","Henry Vaughan","Henry Wadsworth Longfellow","Hugh Henry Brackenridge","Isaac Watts","James Henry Leigh Hunt","James Thomson","James Whitcomb Riley","Jane Austen","Jane Taylor","John Clare","John Donne","John Dryden","John Greenleaf Whittier","John Keats","John McCrae","John Milton","John Trumbull","John Wilmot","Jonathan Swift","Joseph Warton","Joyce Kilmer","Julia Ward Howe","Jupiter Hammon","Katherine Philips","Lady Mary Chudleigh","Lewis Carroll","Lord Alfred Tennyson","Louisa May Alcott","Major Henry Livingston, Jr.","Mark Twain","Mary Elizabeth Coleridge","Matthew Arnold","Matthew Prior","Michael Drayton","Oliver Goldsmith","Oliver Wendell Holmes","Oscar Wilde","Paul Laurence Dunbar","Percy Bysshe Shelley","Philip Freneau","Phillis Wheatley","Ralph Waldo Emerson","Richard Crashaw","Richard Lovelace","Robert Browning","Robert Burns","Robert Herrick","Robert Louis Stevenson","Robert Southey","Robinson","Rupert Brooke","Samuel Coleridge","Samuel Johnson","Sarah Flower Adams","Sidney Lanier","Sir John Suckling","Sir Philip Sidney","Sir Thomas Wyatt","Sir Walter Raleigh","Sir Walter Scott","Stephen Crane","Thomas Campbell","Thomas Chatterton","Thomas Flatman","Thomas Gray","Thomas Hood","Thomas Moore","Thomas Warton","Walt Whitman","Walter Savage Landor","Wilfred Owen","William Allingham","William Barnes","William Blake","William Browne","William Cowper","William Cullen Bryant","William Ernest Henley","William Lisle Bowles","William Morris","William Shakespeare","William Topaz McGonagall","William Vaughn Moody","William Wordsworth"];
  const words="abattu,abature,abatures,messy,abaxial,abaxile,abaya,abayas,abb,abba,abbacies,abbacy,abbas,abbatial,abbe,abbed,abbes,abbess,abbesses,abbey,abbeys,abbot,abbotcies,abbotcy,abbots,abbotship,abbotships,abbreviate,abbreviated,abbreviates,abbreviating,abbreviation,abbreviations,abbreviator,abbreviators,abbreviatory,abbreviature,abbreviatures,abbs,abcee,abcees,abcoulomb,abcoulombs".split(",");
  const addWords="s,ly,es".split(",");
  let G = {WIDTH:800, HEIGHT: 700, PADDING: 40, CHAR_LENGTH: 10};
  G.positions={}; //dictionary of word positions by id
  G.frozenWords={}; //dictionary of unmodifiable word by id
  G.moving=null; //current moving element
  G.divCtr=0;
  let fridge=document.querySelector('div#fridge');

  function saveRoomStateToDB() {
    let roomState=savePositions();
    G.socket.send(JSON.stringify({action:'stateUpdate',room:roomState.room, data:roomState.data}));
  }

  function beforeUnload(e) {
    saveRoomStateToDB();
    G.socket.close();
  }

  function sockets() {
    window.addEventListener('beforeunload', beforeUnload);
    // var host = window.location.origin.replace(/^http/, 'ws');
    G.socket = new WebSocket('ws://localhost:8080');
    G.socket.addEventListener('open', (event) => {
      G.room=window.location.href.split("/");
      G.room=G.room[G.room.length-1];
      G.socket.send(JSON.stringify({action:'newClient', room:G.room}));
    });
    G.socket.addEventListener('message', (event) => {
      event=JSON.parse(event.data);
      // if (!['hydrate','newRoom','freeze','moving'].includes(event.action)) {
      //   console.log('saveroomsatet');
      //   saveRoomStateToDB();
      // }
      switch(event.action) {
        case 'requestCurrentState':
          let roomState=savePositions();
          if (roomState.data.length) {
            console.log('sending roomstatedata',roomState.data);
            G.socket.send(JSON.stringify({action:'stateUpdate',room:roomState.room, data:roomState.data}));
          }
          break;
        case 'hydrate':
          let D=event.data.data;
          loadPositions(D);
          break;
        case 'newRoom':
          console.log('new room entirely');
          break;
        case 'newWord': addWord(event.word); break;
        case 'modify': modifyWord({id:event.elementID, update:event.update}); break;
        case 'delete': deleteElement({id:event.elementID}); break;
        case 'moving': moveElement({id:event.elementID, dx:event.dx, dy:event.dy}); break;
        case 'moveEnd':
          console.log('moveend',event.elementID);
          elevateElement(document.getElementById(event.elementID));
        break;
        case 'freeze':
          outlineWord(event.elementID, event.color, event.clientName);
          G.frozenWords[event.elementID]=true;
          break;
        case 'unfreeze':
          restoreOutline(event.elementID);
          delete G.frozenWords[event.elementID];
          break;
        default: console.log('new ws msg',event); break;
      }
      return false;
    });
  }

  function outlineWord(id, color, cName) {
    let ele=document.getElementById(id);
    ele.style.border=`3px dotted ${color}`;
    let nameDiv=document.createElement('div');
    nameDiv.innerHTML=cName;
    nameDiv.classList.add('client-name');
    ele.appendChild(nameDiv);
  }

  function restoreOutline(id) {
    let ele=document.getElementById(id);
    ele.style.border=`1px solid black`;
    let cName=ele.querySelector('.client-name');
    if (cName) { ele.removeChild(cName); }
  }

  function moveElement(d) {
    let e=document.getElementById(d.id);
    let dim=e.getBoundingClientRect();
    e.dataset.x=Number(e.dataset.x)+d.dx;
    e.dataset.y=Number(e.dataset.y)+d.dy;
    e.style.transform='translate(' + e.dataset.x + 'px, ' + e.dataset.y + 'px)';
  }

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
      let lines=d[Math.floor(Math.random()*(d.length-1))].lines;
      lines=lines.filter(e=>e.length).reduce((a,b)=>a.concat(b),[])
      .join(" ").split(" ").map(e=>e.trim().replace(/[^a-z]/gi,''))
      .filter(e=>e.length);
      lines=lines.filter((e,idx)=>idx===lines.lastIndexOf(e.toLowerCase()));
      G.words=lines.slice(50);
      populateRandomWords(lines.slice(0,50).concat(addWords));
      return true;
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
      for (var i=0;i<15;i++) {
        if (adverbs.lenghth) { random.push(adverbs[randomIn(0,adverbs.length-1)]); }
        random.push(d[randomIn(0,d.length-1)])
        random.push(d[randomIn(0,d.length-1)])
      }
      populateRandomWords(random);
    }

    function fetchLines(author) {
      let URL='http://crossorigin.herokuapp.com/http://poetrydb.org/author/'+author+'/lines';
      fetch(URL).then(res=>{
        if (res.status!==404) { return res.json(); }
      }).then(d=>{
        parseWords(d);
      }).catch(err=>{
        console.log(err);
      });
    }

    function dragMoveListener (event) {
      if (G.frozenWords[event.target.id]) { return false; }
      if (G.moving!==event.target.id) {
          G.moving=event.target.id;
          G.socket.send(JSON.stringify({action:'freeze', elementID:event.target.id, room:G.room}));
      }
      event.stopPropagation();
      (debounce(function(event) {
        if(event.dx!==0||event.dy!==0) {
          G.socket.send(JSON.stringify({action:'moving', elementID:event.target.id, dx: event.dx, dy:event.dy, room:G.room}));
        }
      },100))(event);
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
      target.style.boxShadow=BSHOVER;
    }

    function liftDivUp(elevate, sinkArr) {
      if (!sinkArr.length) { return false; }
      let liftZ=Number(elevate.style.zIndex);
      let idxes=sinkArr.map(e=>Number(e.style.zIndex));
      let max=Math.max(...idxes);
      console.log(elevate, sinkArr,'ldu');

      console.log(liftZ, idxes,'ldu');
      elevate.style.zIndex=max+1;
      sinkArr.forEach(e=>{
        e.style.zIndex=Math.max(0,Number(e.style.zIndex)-1)
      });
    }

    /* from Underscore.js
    Returns a function, that, as long as it continues to be invoked, will not
    be triggered. The function will be called after it stops being called for
    N milliseconds. If `immediate` is passed, trigger the function on the
    leading edge, instead of the trailing.
    */
    debounce = function(func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    };

    function elevateElement(ele) {
      ele.style.backgroundColor = 'white';
      ele.style.color = 'black';
      let lastZ=Number(ele.style.zIndex);
      ele.style.zIndex=lastZ++;
      let collidingRects=[];
      let thisPos=ele.getBoundingClientRect();
      Object.keys(G.positions).filter(key=>key!==ele.id).forEach(key=>{
        if (calculateCollisions(thisPos,G.positions[key])) {
          collidingRects.push(document.getElementById(key));
        }
      });
      console.log(ele, collidingRects);
      if (collidingRects.length) { liftDivUp(ele, collidingRects); }
    }

    function dragEndListener(event) {
      G.moving=null;
      event.stopPropagation();
      G.socket.send(JSON.stringify({action:'unfreeze', elementID:event.target.id, room:G.room}));
      let thisPos=event.target.getBoundingClientRect();
      G.positions[event.target.id]=thisPos;
      elevateElement(event.target);
      event.target.style.boxShadow=BSDEFAULT;
      G.socket.send(JSON.stringify({action:'moveEnd', elementID:event.target.id, finalX:thisPos.x, finalY:thisPos.y, room:G.room}));
    }

    window.dragMoveListener = dragMoveListener;

    function addWordListener(w) {
      document.getElementById(w).addEventListener('click', handleDelete);
      document.getElementById(w).addEventListener('dblclick', handleModify);
    }

    function modifyWord(data) {
      let ele=document.getElementById(data.id);
      let update=data.update;
      ele.innerHTML=update.innerHTML;
      ele.style.width=update.innerHTML.length*G.CHAR_LENGTH;
    }

    function handleModify(e) {
      if (G.frozenWords[e.target.id]) { return false; }
      G.socket.send(JSON.stringify({action:'freeze', elementID:e.target.id, room:G.room}));
      let word=e.target.innerHTML;
      let eleWidth=e.target.getBoundingClientRect().width;
      e.target.innerHTML='';
      let I=document.createElement('input');
      I.value=word;
      I.type='text';
      I.maxLength=20;
      e.target.appendChild(I);
      I.focus();
      I.classList.add('newWord');
      I.style.width=eleWidth;
      e.target.style.zIndex=1;
      e.target.style.backgroundColor = 'white';

      I.addEventListener('keypress', (k) => {
        if (k.keyCode===13) { I.blur(); }
      });
      I.addEventListener('blur', (inputE) => {
        if (I.value.length) {
          e.target.innerHTML=I.value;
          e.target.style.width=I.value.length*G.CHAR_LENGTH;
          G.socket.send(JSON.stringify({action:'modify', elementID:e.target.id, update:{innerHTML:I.value}, room:G.room}));
          G.socket.send(JSON.stringify({action:'unfreeze', elementID:e.target.id, room:G.room}));
        }
        else {
          handleDelete({shiftKey:true, target:e.target});
        }
      });
    }

    function deleteElement(target) {
      let ele = (target.id) ? document.getElementById(target.id) : target.domElement;
      let id = (target.id) ? target.id : target.domElement.id;
      if (ele) {
        ele.removeEventListener('click', handleDelete);
        fridge.removeChild(ele);
      }
      delete G.positions[id];
    }

    function handleDelete(e) {
      if (e.shiftKey) {
        G.socket.send(JSON.stringify({action:'delete', elementID:e.target.id, room:G.room}));
        deleteElement({domElement:e.target});
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
    let fDim=fridge.getBoundingClientRect();
    let YPAD=40;
    let XPAD=25;
    let cX=0;
    let cY=0;
    words.forEach((w,idx)=>{
      let d=document.createElement('div');
      d.innerHTML=w;
      d.id='div-'+G.divCtr;
      let pxWidth=d.innerHTML.length*G.CHAR_LENGTH;
      d.style.width=pxWidth+"px";
      G.divCtr++;
      fridge.appendChild(d);
      if (idx!==0) {
        cX=G.positions[G.lastID].right;
      }
      if ((cX+pxWidth+XPAD)>fDim.right) {
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
      G.lastID=d.id;
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
        bgColor:w.style.backgroundColor,
        angle:w.dataset.angle
      });
    });
    localStorage.setItem('positions', JSON.stringify(data));
    return {data:data, room:G.room};
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
    rows=nL.map((e,idx)=>sorted.slice(e,nL[idx+1])).map(r=>r.sort((a,b)=>sortFn(a[2],b[2])));
    let text=rows.map(e=>e.map(el=>document.getElementById(el[3]).innerHTML).join(" "));
    console.log(text.join("\n"));
  }

  function loadPositions(data) {
    let D=data ? data : JSON.parse(localStorage.getItem('positions'));
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
        if (div.angle) {
          q.style.transform+='rotateZ('+div.angle+'deg)';
          q.dataset.angle=div.angle;
        }
        q.style.width=q.innerHTML.length*G.CHAR_LENGTH;
        q.classList.add('word');
        q.classList.add('draggable');
        fridge.appendChild(q);
        G.positions[q.id]=q.getBoundingClientRect();
        addWordListener(q.id);
      });
      printPoem();
      setInteractions();
  }

  document.querySelector('button#poemify').addEventListener('click', printPoem);
  document.querySelector('button#save').addEventListener('click', savePositions);
  document.querySelector('button#load').addEventListener('click', loadPositions);
  document.querySelector('button#newWord').addEventListener('click', ()=>addNewWord({wSource:'list'}));
  document.querySelector('form#newWord').addEventListener('submit', addNewWord);
  document.querySelector('form#wordSubmit').addEventListener('submit', addNewWords);

  const wordToDelimiter = {'space':' ','comma':',','newline':'\n','tab':'\t'};

  function addNewWords(e) {
    e.preventDefault();
    let T=document.querySelector('textarea#text').value;
    let D=document.querySelector('select#delimiter').value;
    //space,comma,newline,tab
    T=T.split(wordToDelimiter[D]);
    populateRandomWords(T);
    console.log(T, D);
  }

  function addWord(word) {
    let numWords=document.querySelectorAll('div.word').length;
    let d=document.createElement('div');
    let XPAD=25;
    let YPAD=40;
    let WHEIGHT=45;
    let fDim=fridge.getBoundingClientRect();
    let pxWidth=word.length*G.CHAR_LENGTH;
    d.innerHTML=word;
    d.id='div-'+G.divCtr;
    G.divCtr++;
    d.style.width=pxWidth+"px";
    if (!G.lastID) {
      let ids=Object.keys(G.positions)
      G.lastID=ids[ids.length-1];
      console.log(Object.keys(G.positions), G.positions.length);
    }
    let cX=G.positions[G.lastID].right;
    let cY=G.positions[G.lastID].top-fDim.top;
    if ((cX+pxWidth+XPAD)>fDim.right) {
      cX=0;
      cY+=YPAD;
    }
    if (cY+WHEIGHT>fDim.bottom-YPAD) {
        return false;
    }  else { ; }
    d.dataset.x=cX;
    d.dataset.y=cY;
    d.style.transform ='translate(' + d.dataset.x+ 'px, ' + d.dataset.y + 'px)';
    d.classList.add('word');
    d.classList.add('draggable');
    fridge.appendChild(d);
    d.style.zIndex=1;
    d.style.backgroundColor='white';
    G.lastID=d.id;
    addWordListener(d.id);
    G.positions[d.id]=d.getBoundingClientRect();
    setInteractions();
  }

  function addNewWord(e) {
    if (!e.wSource) {
      e.preventDefault();
      let newWord=document.querySelector('input#newWord');
      if (newWord.value.length) {
        addWord(newWord.value);
        G.socket.send(JSON.stringify({action:'newWord', word:newWord.value, room:G.room}));
        newWord.value='';
        newWord.blur();
      }
    }
    else if (G.words) {
      console.log(G.words);
      let W=G.words.shift();
      if (W) {
        addWord(W);
        G.socket.send(JSON.stringify({action:'newWord', word:W, room:G.room}));
      }
    }
    else { return false; }
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

  // populateRandomWords(words);
  populateSelector();
  sockets();
  // fetchLines('Walt Whitman');
  // listenToWords();
}
