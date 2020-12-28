// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"view/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function formatDate(d) {
  var HH = d.getHours() + '';
  var mm = d.getMinutes() + '';
  var ss = d.getSeconds() + '';
  return HH.padStart(2, '0') + ":" + mm.padStart(2, '0') + ":" + ss.padStart(2, '0');
}

function hideButton() {
  var editBtn = document.querySelectorAll('.edit-btn');
  editBtn.forEach(function (item) {
    return item.classList.add('vanish');
  });
  var completeBtn = document.querySelectorAll('.complete-btn');
  completeBtn.forEach(function (item) {
    return item.classList.add('vanish');
  });
}

;

(function () {
  var tabButton = [{
    tabName: "待處理",
    id: 1
  }, {
    tabName: "封存",
    id: 2
  }, {
    tabName: "已完成",
    id: 3
  }];
  var el = document.querySelector('.tab-btn-wrapper');
  el.innerHTML += tabButton.map(function (x) {
    return "<button class=\"tab-btn\">".concat(x.tabName, "</button>");
  }).join('');
  el.addEventListener('click', function (ev) {
    var i = _toConsumableArray(el.children).findIndex(function (e) {
      return e === ev.target;
    });

    switch (i) {
      case 0:
        document.querySelector('.table-wrapper-operation').classList.remove('vanish');
        Todo(data.filter(function (item) {
          return item.status === true && item.finish === false;
        }));
        break;

      case 1:
        document.querySelector('.table-wrapper-operation').classList.add('vanish');
        Todo(data.filter(function (item) {
          return item.status === false;
        })); //隱藏編輯及完成按鈕

        hideButton(); //在刪除按鈕前新增還原按鈕

        var refNode = document.querySelectorAll('.deleteBtn');
        var allBtn = document.querySelectorAll('.all-btn');

        _toConsumableArray(allBtn).forEach(function (item, i) {
          var newBtn = document.createElement("button");
          newBtn.addEventListener('click', function (e) {
            alert(313);
          });
          newBtn.innerHTML = "還原";
          item.insertBefore(newBtn, refNode[i]);
        });

        break;

      case 2:
        document.querySelector('.table-wrapper-operation').classList.add('vanish');
        Todo(data.filter(function (item) {
          return item.finish === true;
        }));
        var tr = document.querySelectorAll('.table-content');
        tr.forEach(function (item) {
          return item.classList.add('finishLine');
        });
        hideButton();
        var refNodes = document.querySelectorAll('.deleteBtn');
        var allBtns = document.querySelectorAll('.all-btn');

        _toConsumableArray(allBtns).forEach(function (item, i) {
          var newBtn = document.createElement("button");
          newBtn.addEventListener('click', function (e) {
            var cancel = data.findIndex(function (item, index) {
              return item.id === data[index].id;
            });
            console.log(cancel);
            data[cancel].finish = false;
            document.querySelector('.table-content').remove(); // data.forEach((item,index)=> {
            //   if(i === index){
            //   console.log(item, i , index)
            //   item.finish = false
            // }
            // })
          });
          newBtn.innerHTML = "取消";
          item.insertBefore(newBtn, refNodes[i]);
        });

        break;
    }
  });
  var data = [];
  var id = 1; ////新增

  document.getElementById('submit-btn').addEventListener('click', addData);

  function addData(e) {
    e.preventDefault();
    var input = document.getElementById('name').value;

    if (input === "") {
      alert("請輸入代辦事項");
    } else {
      var todo = {
        id: id++,
        name: input,
        createTime: new Date(),
        completeTime: 2222,
        status: true,
        finish: false
      };
      data.push(todo);
      Todo(data.filter(function (item) {
        return item.status === true && item.finish === false;
      }));
      document.getElementById('name').value = "";
    }
  }

  function Todo(data) {
    var els = document.querySelector(".content-list"); //切片(緩存---性能較好)

    var fragment = document.createDocumentFragment();
    data.forEach(function (value, index) {
      var tr = document.createElement('tr');
      tr.classList.add('table-content');
      tr.innerHTML = "<td>".concat(value.id, "</td>\n          <td class=\"editName\">").concat(value.name, "</td>\n          <td>").concat(formatDate(value.createTime), "</td>\n          <td>").concat(value.completeTime, "</td>\n          <td class=\"all-btn\">\n          <button class=\"edit-btn\">\u7DE8\u8F2F</>\n          <button class=\"complete-btn\">\u5B8C\u6210</>\n          <button class=\"deleteBtn\">\u522A\u9664</>\n          </td>"); //編輯

      tr.querySelector('.edit-btn').addEventListener('click', editData);

      function editData() {
        var edit = tr.querySelector('.editName').innerHTML = "<input class='enter' />";

        if (edit) {
          tr.querySelector('.enter').addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
              tr.querySelector('.editName').innerHTML = "<td class='editName' />";
              tr.querySelector('.editName').innerText = e.target.value;
            }
          });
        }
      } //完成


      tr.querySelector('.complete-btn').addEventListener('click', completeBtn);

      function completeBtn() {
        var finish = data.findIndex(function (item) {
          return item.id === value.id;
        });
        console.log(~finish);

        if (~finish) {
          data.map(function (item) {
            item.finish = true;
          });
          els.removeChild(tr);
        }
      } //封存


      tr.querySelector('.deleteBtn').addEventListener('click', function (e) {
        var deleteId = data.findIndex(function (item) {
          return item.id === value.id;
        });

        if (~deleteId) {
          data.map(function (item) {
            item.status = false;
          });
          els.removeChild(tr);
        } // data = [...data]

      }); //刪除
      // tr.querySelector('.deleteBtn').addEventListener('click', (e) => {
      //
      //   els.removeChild(tr)
      //   let deleteId = data.findIndex(item=>{
      //     return item.id === value.id
      //   })
      //   if(~deleteId){
      //     data.splice(deleteId,1)
      //   }
      // })

      fragment.append(tr);
    });
    els.innerHTML = "";
    els.append(fragment);
  }
})(); //Frank解法
// (() => {
//   let tabButton = [{
//     tabName: "待處理", id: 1
//   },
//     {
//       tabName: "封存", id: 2
//     },
//     {
//       tabName: "已完成", id: 3
//     }]
//
//   let el = document.querySelector('.tab-btn');
//   el.innerHTML += tabButton.map(x => `<button>${x.tabName}</button>`).join('')
//
//
//   let data = []
// ////新增
//   document.getElementById('submit-btn').addEventListener('click', addData);
//
//   function addData(e) {
//     e.preventDefault()
//     let input = document.getElementById('name').value
//     let todo = {
//       id: 1,
//       name: input,
//       createTime: 1111,
//       completeTime: 2222
//     };
//     data.push(todo)
//     aaa()
//     document.getElementById('name').value = ""
//   }
//
//   function aaa() {
//     const els = document.querySelector(".content-list");
//     //切片(緩存---性能較好)
//     const fragment = document.createDocumentFragment()
//     data.forEach((value, index) => {
//       const random = Math.random()
//       return ((i, r) => {
//         const tr = document.createElement('tr')
//         tr.innerHTML =
//           `<td>${value.id}</td>
//             <td>${value.name}</td>
//             <td>${value.createTime}</td>
//             <td>${value.completeTime}</td>
//             <td>
//             <button class="edit-btn">編輯</>
//             <button class="complete-btn">完成</>
//             <button class="deleteBtn">刪除</>
//             </td>`
//         console.log(value._r)
//         value._r = r
//         ////刪除
//         tr.querySelector('.deleteBtn').addEventListener('click', () => {
//           els.removeChild(tr)
//           data.splice(data.findIndex(e => e._r === r), 1)
//         })
//         fragment.append(tr)
//       })(index, random)
//     })
//     els.innerHTML = "";
//     els.append(fragment)
//   }
// })()
//另一種寫法
// const item = e.target
// if(item.classList[0] === 'deleteBtn' ){
//   const todo = item.parentElement;
//   todo.classList.add('fall')
//   addEventListener('transitionend',function (){
//     todo.remove()
//   })
// }
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54514" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","view/index.js"], null)
//# sourceMappingURL=/view.45cdd366.js.map