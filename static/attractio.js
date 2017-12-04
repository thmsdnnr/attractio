window.twttr = (function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0],
  t = window.twttr || {};
if (d.getElementById(id)) return t;
js = d.createElement(s);
js.id = id;
js.src = "https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js, fjs);

t._e = [];
t.ready = function(f) {
  t._e.push(f);
};

return t;
}(document, "script", "twitter-wjs"));

 window.onload = function() {
  const BSHOVER='0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
  const BSDEFAULT_ONE='0 1px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
  const twitterBird=`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTQxLjMzMjk5MjU1MzcxMSAxNDEuMzMyOTkyNTUzNzExIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImRlZjAiIHgxPSIwLjUwMDAwNSIgeDI9IjAuNTAwMDA0IiB5MT0iMSIgeTI9IjQuNjQyNDFFLTA2Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1OTgyREYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NEFBQ0QiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Zz48cGF0aCBkPSJNMTcuMzMzMywwQzcuNzYsMCwwLDcuNzU5OTksMCwxNy4zMzMzTDAsMTI0QzAsMTMzLjU3Myw3Ljc2LDE0MS4zMzMsMTcuMzMzMywxNDEuMzMzTDEyNCwxNDEuMzMzQzEzMy41NzMsMTQxLjMzMywxNDEuMzMzLDEzMy41NzMsMTQxLjMzMywxMjRMMTQxLjMzMywxNy4zMzMzQzE0MS4zMzMsNy43NTk5OSwxMzMuNTczLDAsMTI0LDBMMTcuMzMzMywweiIgZmlsbD0idXJsKCNkZWYwKSIvPjxwYXRoIGQ9Ik0xMjIuOTg4LDM4LjIxMzZDMTE5LjEzOSwzOS45MjE2IDExNSw0MS4wNzQ5IDExMC42NTgsNDEuNTkyMyAxMTUuMDksMzguOTM2MyAxMTguNDk0LDM0LjcyOTYgMTIwLjA5OCwyOS43MTQ5IDExNS45NSwzMi4xNzYzIDExMS4zNTUsMzMuOTYxNiAxMDYuNDY0LDM0LjkyNTYgMTAyLjU0OCwzMC43NTIzIDk2Ljk2ODMsMjguMTQ1NiA5MC43OTM2LDI4LjE0NTYgNzguOTM2MywyOC4xNDU2IDY5LjMyNTYsMzcuNzU3NiA2OS4zMjU2LDQ5LjYxMzYgNjkuMzI1Niw1MS4yOTc2IDY5LjUxNjMsNTIuOTM2MyA2OS44ODE2LDU0LjUwNjkgNTIuMDM4OSw1My42MTA5IDM2LjIxODksNDUuMDY1NiAyNS42Mjk2LDMyLjA3NDkgMjMuNzgyOSwzNS4yNDY5IDIyLjcyNDMsMzguOTM0OSAyMi43MjQzLDQyLjg2ODMgMjIuNzI0Myw1MC4zMTc2IDI2LjUxNDksNTYuODg4MyAzMi4yNzM2LDYwLjczODkgMjguNzU0OSw2MC42MjgzIDI1LjQ0NDMsNTkuNjYwMyAyMi41NDk2LDU4LjA1MjMgMjIuNTQ5Niw1OC4xNDE2IDIyLjU0ODMsNTguMjMyMyAyMi41NDgzLDU4LjMyNDMgMjIuNTQ4Myw2OC43MjQzIDI5Ljk0ODMsNzcuNDAyOSAzOS43NzA5LDc5LjM3MzYgMzcuOTY4Myw3OS44NjU2IDM2LjA3MDksODAuMTI2OSAzNC4xMTM2LDgwLjEyNjkgMzIuNzI5Niw4MC4xMjY5IDMxLjM4NTYsNzkuOTkyMyAzMC4wNzM2LDc5Ljc0MTYgMzIuODA1Niw4OC4yNzIzIDQwLjczNjMsOTQuNDc4OSA1MC4xMjgzLDk0LjY1MjMgNDIuNzgxNiwxMDAuNDEgMzMuNTI0MywxMDMuODQzIDIzLjQ2NjksMTAzLjg0MyAyMS43MzQ5LDEwMy44NDMgMjAuMDI0MywxMDMuNzQyIDE4LjM0NTYsMTAzLjU0MyAyNy44NDY5LDEwOS42MzQgMzkuMTMwOSwxMTMuMTg3IDUxLjI1NjMsMTEzLjE4NyA5MC43NDI5LDExMy4xODcgMTEyLjMzOSw4MC40NzQ5IDExMi4zMzksNTIuMTAyOSAxMTIuMzM5LDUxLjE3MjMgMTEyLjMxNiw1MC4yNDY5IDExMi4yNzUsNDkuMzI1NiAxMTYuNDcsNDYuMzAwMyAxMjAuMTExLDQyLjUxODkgMTIyLjk4OCwzOC4yMTM2eiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L3N2Zz4=`;
  const authors=["Adam Lindsay Gordon","Alan Seeger","Alexander Pope","Algernon Charles Swinburne","Ambrose Bierce","Amy Levy","Andrew Marvell","Ann Taylor","Anne Bradstreet","Anne Bronte","Anne Killigrew","Anne Kingsmill Finch","Annie Louisa Walker","Arthur Hugh Clough","Ben Jonson","Charles Kingsley","Charles Sorley","Charlotte Bronte","Charlotte Smith","Christina Rossetti","Christopher Marlowe","Christopher Smart","Coventry Patmore","Edgar Allan Poe","Edmund Spenser","Edward Fitzgerald","Edward Lear","Edward Taylor","Edward Thomas","Eliza Cook","Elizabeth Barrett Browning","Emily Bronte","Emily Dickinson","Emma Lazarus","Ernest Dowson","Eugene Field","Francis Thompson","Geoffrey Chaucer","George Eliot","George Gordon, Lord Byron","George Herbert","George Meredith","Gerard Manley Hopkins","Helen Hunt Jackson","Henry David Thoreau","Henry Vaughan","Henry Wadsworth Longfellow","Hugh Henry Brackenridge","Isaac Watts","James Henry Leigh Hunt","James Thomson","James Whitcomb Riley","Jane Austen","Jane Taylor","John Clare","John Donne","John Dryden","John Greenleaf Whittier","John Keats","John McCrae","John Milton","John Trumbull","John Wilmot","Jonathan Swift","Joseph Warton","Joyce Kilmer","Julia Ward Howe","Jupiter Hammon","Katherine Philips","Lady Mary Chudleigh","Lewis Carroll","Lord Alfred Tennyson","Louisa May Alcott","Major Henry Livingston, Jr.","Mark Twain","Mary Elizabeth Coleridge","Matthew Arnold","Matthew Prior","Michael Drayton","Oliver Goldsmith","Oliver Wendell Holmes","Oscar Wilde","Paul Laurence Dunbar","Percy Bysshe Shelley","Philip Freneau","Phillis Wheatley","Ralph Waldo Emerson","Richard Crashaw","Richard Lovelace","Robert Browning","Robert Burns","Robert Herrick","Robert Louis Stevenson","Robert Southey","Robinson","Rupert Brooke","Samuel Coleridge","Samuel Johnson","Sarah Flower Adams","Sidney Lanier","Sir John Suckling","Sir Philip Sidney","Sir Thomas Wyatt","Sir Walter Raleigh","Sir Walter Scott","Stephen Crane","Thomas Campbell","Thomas Chatterton","Thomas Flatman","Thomas Gray","Thomas Hood","Thomas Moore","Thomas Warton","Walt Whitman","Walter Savage Landor","Wilfred Owen","William Allingham","William Barnes","William Blake","William Browne","William Cowper","William Cullen Bryant","William Ernest Henley","William Lisle Bowles","William Morris","William Shakespeare","William Topaz McGonagall","William Vaughn Moody","William Wordsworth"];
  const words="abattu,abature,abatures,messy,abaxial,abaxile,abaya,abayas,abb,abba,abbacies,abbacy,abbas,abbatial,abbe,abbed,abbes,abbess,abbesses,abbey,abbeys,abbot,abbotcies,abbotcy,abbots,abbotship,abbotships,abbreviate,abbreviated,abbreviates,abbreviating,abbreviation,abbreviations,abbreviator,abbreviators,abbreviatory,abbreviature,abbreviatures,abbs,abcee,abcees,abcoulomb,abcoulombs".split(",");
  const addWords="s,ly,es".split(",");
  let G = {WIDTH:800, HEIGHT: 700, CHAR_LENGTH: 10};
  G.positions={}; //dictionary of word positions by id
  G.orderAdded=[]; //ordered array of div id keys in order added to DOM.
  G.frozenWords={}; //dictionary of unmodifiable word by id
  G.moving=null; //current moving element
  G.divCtr=0;
  G.reconnectAttempts=0;
  const getLastID = () => G.orderAdded.length>0 ? G.orderAdded[G.orderAdded.length-1] : 0;
  let fridge=document.querySelector('div#fridge');

  // debounce from Underscore.js
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

  function saveRoomStateToDB() {
    let roomState=savePositions();
    if (roomState.data) { G.sendMsg({action:'stateUpdate',room:roomState.room, data:roomState.data}); }
  }

  function beforeUnload(e) {
    saveRoomStateToDB();
    G.socket.close();
  }

  function openWordGatherModal() {
    //Modal Helper functions: data fetch and dropdown population for fetch options
    const poetSelect = (e) => fetchLines(e.target.value).then((lines=>document.querySelector('textarea#newWords').value=lines.join(" ")));
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
    if (!G.modal) {
      G.modal = new tingle.modal({
          footer: true,
          stickyFooter: false,
          closeMethods: ['button'],
          cssClass: ['wordGrab-modal'],
          closeLabel: "Close",
          beforeOpen: function() {
            document.querySelector('div#container').classList.add('blur');
            let d=document.createElement('div');
            d.id='modalBackground';
            document.body.appendChild(d);
          },
          onOpen: function() { },
          onClose: function() { },
          beforeClose: function() {
                let d=document.querySelector('div#modalBackground');
                document.body.removeChild(d);
                return true;
        }
      });

      G.modal.setContent(`<div id="wordSubmit">
        <p><h1>Enter Some Words to Magnetize</h1></p>
        <textarea rows="20" cols="60" id="newWords" spellcheck="false"></textarea>
        <p><label for="d">delimited by:</label>
        <select id="delimiter" name="d">
          <option id="space" default>space</option>
          <option id="comma">comma</option>
          <option id="newline">newline</option>
          <option id="tab">tab</option>
        </select></p>
        <p><label for="d">or Get Inspired:</label> <select id="poet" name="poet"></p>
        </select><span id="small">(via <a href="http://poetrydb.org/index.html" target="_new">poetryDB</a>!)</span>
      </div>`);
      G.modal.addFooterBtn('MAGNETIZE', 'tingle-btn tingle-btn--primary tingle-btn--full-width burn-after-reading', function() {
        const wordToDelimiter = {'space':' ','comma':',','newline':'\n','tab':'\t'};
        let T=document.querySelector('textarea#newWords').value;
        let D=document.querySelector('select#delimiter').value;
        T=T.split(wordToDelimiter[D]).filter(e=>e.length);
        if (T.length>=6) {
          populatePage();
          domReadyEventListeners();
          populateRandomWords(T);
          var bAR=document.querySelector('.burn-after-reading');
          document.querySelector('div.tingle-modal-box__footer').removeChild(bAR);
          G.modal.setContent(`<p><h1>Here t'is: <input id="url" /></h1><p><h2>(it's also on your clipboard)</h2></p><p><h2><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Help me write my fridge poem!&hashtags=poetry,collab,writeWithMe&url=${window.location.href}" target="_new"
          data-size="large"></p><p><img src="${twitterBird}" width="32px" height="32px" id="twitter"></a> for help</h2></p>`);
          let I=document.querySelector('input#url');
          I.value=window.location.href;
          I.style.width=I.value.length*10+"px";
          I.style.maxWidth="100%";
          I.focus();
          I.select();
          document.execCommand("copy"); //copy URL to clipboard
          G.modal.addFooterBtn('CLOSE AND PLAY', 'tingle-btn tingle-btn--danger tingle-btn--full-width', function() { G.modal.close(); });
        } else { document.querySelector('textarea#newWords').value='You need at least six words!'; }
      });
    }
    populateSelector();
    G.modal.open();
  }

  function poemifyModal(poem) { //the poem display modal
    let entity=`\&#10;`;
    poem=poem.join(entity);
    if (!G.poemify) {
      G.poemify = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        cssClass: ['poemify-modal'],
        closeLabel: "Close",
        beforeOpen: function() {
          document.querySelector('div#container').classList.add('blur');
          let d=document.createElement('div');
          d.id='modalBackground';
          document.body.appendChild(d);
        },
        onOpen: function() {},
        onClose: function() {},
        beforeClose: function() {
          let d=document.querySelector('div#modalBackground');
          document.body.removeChild(d);
          return true;
        }
    });
    G.poemify.addFooterBtn('GO BACK', 'tingle-btn tingle-btn--primary tingle-btn--full-width', function() { G.poemify.close(); });
  }
    G.poemify.setContent('');
    G.poemify.setContent(`<div id="wordSubmit">
        <p><h1><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=${poem}&hashtags=poetry,collab&url=${window.location.href}" target="_new"
        data-size="large"><img src="${twitterBird}" width="48px" height="48px"></a> My, what a beautiful poem!</h1></p>
        <textarea rows="20" cols="60" id="newWords" spellcheck="false">${poem}</textarea>
      </div>`);
    G.poemify.open();
  }

  function sockets() {
    window.addEventListener('beforeunload', beforeUnload);
    var host = window.location.origin.replace(/^http/, 'ws');
    G.socket = new WebSocket(host);
    G.room=window.location.href.split("/");
    G.room=G.room[G.room.length-1];
    G.sendMsg = function(msg) { //socket message wrapper
      if (G.socket.readyState===G.socket.OPEN) {
        let roomState=savePositions();
        let payload=JSON.stringify(Object.assign(msg, {room:roomState.room, data:roomState.data}));
        // console.log('Client sent: ',payload.slice(0,100), new Date(Date.now()).toTimeString());
        G.socket.send(payload);
      }
      else { //need to recover connection
        if (G.reconnectAttempts<5) {
          G.socket = new WebSocket(host);
          G.socket.send(JSON.stringify({action:'lapsedClient'}));
        }
        G.reconnectAttempts++;
      }
    };
    G.socket.addEventListener('open', (event) => {
      G.sendMsg({action:'newClient'});
    });
    G.socket.addEventListener('message', (event) => {
      event=JSON.parse(event.data);
      // console.log('client received', event, event.action);
      switch(event.action) {
        case 'roomFull':
          let sigh=document.createElement('div');
          let base=window.location.href.split("/");
          base=base.slice(0,base.length-1).join("/")+"/";
          let links=event.data.map(e=>base+e);
          sigh.innerHTML=`<h1>Oh no!</h1><p>this room is currently full :(</p><p>Make <a href="${links[0]}">a</a> <a href="${links[1]}">new</a> <a href="${links[2]}">one</a></p>
            <p>...or try back later</p>`;
          sigh.classList.add('roomFull');
          document.body.appendChild(sigh);
        break;
        case 'requestCurrentState':
          let roomState=savePositions();
          if (roomState.data.length) {
            G.sendMsg({action:'stateUpdate'});
          } else {
            G.sendMsg({action:'emptyRoom'});
          }
          break;
        case 'rehydrate':
          loadPositions(event.data);
        case 'hydrate':
          populatePage();
          domReadyEventListeners();
          loadPositions(event.data);
          break;
        case 'newRoom':
          openWordGatherModal();
          break;
        case 'newWord': receiveWordDiv(event); break;
        case 'modify': modifyWord({id:event.elementID, update:event.update}); break;
        case 'delete': deleteElement({id:event.elementID}); break;
        case 'moving': moveElement({id:event.elementID, dx:event.dx, dy:event.dy}); break;
        case 'moveEnd':
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
      default: break;
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
    e.dataset.angle='';
    e.style.transform='translate(' + e.dataset.x + 'px, ' + e.dataset.y + 'px)';
  }

  function setInteractions() {
    interact('.draggable')
      .draggable({
        inertia: true,
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: false,
        onmove: dragMoveListener,
        onend: dragEndListener
      });
    }

    const randomIn = (lo, hi) => Math.floor(Math.random()*(hi-lo))+lo;

    function parseWords(d) {
      let lines=d[Math.floor(Math.random()*(d.length-1))].lines;
      lines=lines.filter(e=>e.length).reduce((a,b)=>a.concat(b),[])
      .join(" ").split(" ").map(e=>e.trim().replace(/[^a-z]/gi,''))
      .filter(e=>e.length);
      lines=lines.filter((e,idx)=>idx===lines.lastIndexOf(e.toLowerCase()));
      G.words=lines.slice(50);
      return lines.slice(0,50).concat(addWords);
    }

    function fetchLines(author) {
      return new Promise(function(resolve,reject) {
        let URL='https://crossorigin.herokuapp.com/http://poetrydb.org/author/'+author+'/lines';
        fetch(URL).then(res=> res.status!==404 ? res.json() : reject())
        .then(d=>resolve(parseWords(d)))
        .catch(err=>reject(err));
      });
    }

    function dragMoveListener (event) {
      if (G.frozenWords[event.target.id]) { return false; }
      if (G.moving!==event.target.id) {
        G.moving=event.target.id;
        G.sendMsg({action:'freeze', elementID:event.target.id});
      }
      event.stopPropagation();
      (debounce(function(event) {
        if(event.dx!==0||event.dy!==0) {
          G.sendMsg({action:'moving', elementID:event.target.id, dx: event.dx, dy:event.dy});
        }
      },100))(event);
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
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
      elevate.style.zIndex=max+1;
      sinkArr.forEach(e=>e.style.zIndex=Math.max(0,Number(e.style.zIndex)-1));
    }

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
      if (collidingRects.length) { liftDivUp(ele, collidingRects); }
    }

    function dragEndListener(event) {
      G.moving=null;
      event.stopPropagation();
      G.sendMsg({action:'unfreeze', elementID:event.target.id});
      let thisPos=event.target.getBoundingClientRect();
      G.positions[event.target.id]=thisPos;
      elevateElement(event.target);
      event.target.style.boxShadow=BSDEFAULT_ONE;
      G.sendMsg({action:'moveEnd', elementID:event.target.id, finalX:thisPos.x, finalY:thisPos.y});
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
      G.sendMsg({action:'freeze', elementID:e.target.id});
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
          G.sendMsg({action:'modify', elementID:e.target.id, update:{innerHTML:I.value}});
          G.sendMsg({action:'unfreeze', elementID:e.target.id});
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
      G.orderAdded=G.orderAdded.filter(e=>e!==id);
    }

    function handleDelete(e) {
      if (e.shiftKey) {
        G.sendMsg({action:'delete', elementID:e.target.id});
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
      let lastID=getLastID();
      let d=document.createElement('div');
      d.innerHTML=w;
      d.id='div-'+G.divCtr;
      let pxWidth=d.innerHTML.length*G.CHAR_LENGTH;
      d.style.width=pxWidth+"px";
      G.divCtr++;
      fridge.appendChild(d);
      if (idx!==0) { cX=G.positions[lastID].right-XPAD; }
      if ((cX+pxWidth+XPAD)>fDim.right-XPAD) {
        cX=4;
        cY+=YPAD;
      }
      d.dataset.x=cX;
      d.dataset.y=cY;
      addWordListener(d.id);
      let angle=randomIn(-3,5);
      d.style.transform='translate(' + d.dataset.x + 'px, ' + d.dataset.y + 'px)';
      d.dataset.angle=angle;
      d.style.transform+='rotateZ('+angle+'deg)';
      d.classList.add('word','noSelect','draggable');
      G.positions[d.id]=d.getBoundingClientRect();
      G.orderAdded.push(d.id);
    });
    setInteractions();
    saveRoomStateToDB();
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
    return {data:data, room:G.room};
  }

  function sortFn(a,b) {
    if (a>b) { return 1; }
    else if (a<b) { return -1; }
    else { return 0; }
  }

  function printPoem() { //sort by xPos, yPos, infer rows, sort row by tiebreaker
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
    poemifyModal(text);
  }

  function loadPositions(D) {
    G.positions={};
      fridge.innerHTML='';
      D.forEach(div=>{
        G.divCtr++;
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
        q.classList.add('word','noSelect','draggable');
        fridge.appendChild(q);
        G.positions[q.id]=q.getBoundingClientRect();
        G.orderAdded.push(q.id);
        addWordListener(q.id);
      });
    setInteractions();
  }

  function populatePage() { document.querySelector('div#container').style.display='inline'; }

  function domReadyEventListeners() {
    document.querySelector('button#poemify').addEventListener('click', printPoem);
    document.querySelector('form#newWord').addEventListener('submit', addWordFromInput);
  }

  function receiveWordDiv(div) {
    let d=document.createElement('div');
    let P=JSON.parse(div.word);
    Object.keys(P).forEach(key=>Object.assign(d[key], P[key]));
    Object.assign(d.dataset,P.dataset);
    Object.assign(d.style,P.style);
    d.id=P.id;
    d.innerHTML=P.innerHTML;
    d.classList.add('word','noSelect','draggable');
    fridge.appendChild(d);
    G.positions[d.id]=d.getBoundingClientRect();
    G.orderAdded.push(d.id);
  }

  let addWordRow=0;
  let addWordRowInit=false;

  function addWord(word) {
    let lastID=getLastID();
    let fDim=fridge.getBoundingClientRect();
    let pxWidth=word.length*G.CHAR_LENGTH;
    G.divCtr++;
    let YPAD=40;
    let XPAD=25;
    let WORDHEIGHT=45;
    if (!addWordRowInit) { addWordRow=G.positions[lastID].top-YPAD-WORDHEIGHT; addWordRowInit=true; }
    let cX=0;
    let cY=0;
    cX=G.positions[lastID].right-XPAD;
    if ((cX+pxWidth+XPAD)>fDim.right-XPAD) {
      cX=4;
      addWordRow+=YPAD;
    }
    cY=addWordRow;
    if ((cY+WORDHEIGHT)>fDim.height) {
      return false; //no more room!
    } //ok we have room let's add it
    let angle=randomIn(-3,5);
    let d=document.createElement('div');
    d.innerHTML=word;
    d.id='div-'+G.divCtr;
    d.dataset.x=cX;
    d.dataset.y=cY;
    d.dataset.angle=angle;
    d.style.transform='translate(' + d.dataset.x + 'px, ' + d.dataset.y + 'px)';
    d.style.transform+='rotateZ('+angle+'deg)';
    d.classList.add('word','noSelect','draggable');
    d.style.width=pxWidth+"px";
    G.divCtr++;
    fridge.appendChild(d);
    addWordListener(d.id);
    G.positions[d.id]=d.getBoundingClientRect();
    G.orderAdded.push(d.id);
    setInteractions();
    return JSON.stringify({
      id:d.id,
      innerHTML:d.innerHTML,
      dataset:{x:d.dataset.x,y:d.dataset.y,angle:d.dataset.angle},
        style: {
          transform:d.style.transform,
          zIndex:d.style.zIndex,
          backgroundColor:d.style.backgroundColor
        }
      });
  }

  function addWordFromInput(e) {
    e.preventDefault();
    let newWord=document.querySelector('input#newWord');
    if (newWord.value.length) {
      let nW=addWord(newWord.value);
      if (nW) {
        G.sendMsg({action:'newWord', word:nW});
        newWord.value='';
      } else { newWord.value='no more room!'; }
      newWord.blur();
    }
  }
  sockets();
}
