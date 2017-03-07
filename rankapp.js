var update = document.getElementById('update');

// 更新ボタンをクリックした時の処理
update.addEventListener('click', function() {
  
  var table = document.getElementById('ranking');

  table.innerHTML = '';
  window.localStorage.removeItem('appranking');

  getAppList();

}, false);


// 最初に実行する処理
window.addEventListener('load', function() {

  var listKey = window.localStorage.getItem('appranking');

  if(listKey) {
    
    // ローカルストレージにデータがあれば
    // そのデータを使ってランキングを表示
    createAppList(JSON.parse(listKey));
    
  }
  else {
    
    // ローカルストレージにデータが無ければ
    // JSONデータを取得
    getAppList();
  
  }

}, false);



// JSONデータの取得処理
function getAppList() {
  var url = 'https://itunes.apple.com/jp/rss/topfreeapplications/limit=10/json';
  
  fetch(url)
  .then(function (data) {

      return data.json(); // 読み込むデータをJSONに設定

  })
  .then(function (json) {
    
    var appList = json.feed.entry; // 配列データを格納

    window.localStorage.setItem('appranking', JSON.stringify(appList));
    createAppList(appList);

  });
}


// ランキングデータのテーブル要素を生成
function createAppList(appList) {
  
  var table = document.getElementById('ranking');
  
  for(var i=0; i<appList.length; i++) {
    var imgUrl = appList[i]['im:image'][0].label;  // アプリのアイコン画像URL
    var appTitle = appList[i].title.label;         // アプリのタイトル
    var linkUrl = appList[i].link.attributes.href; // アプリのダウンロードURL
    var row = table.insertRow();

    row.insertCell().textContent = i+1;
    row.insertCell().innerHTML = '<img src="'+ imgUrl +'">';
    row.insertCell().textContent = appTitle;
    row.insertCell().innerHTML = '<a href="' + linkUrl +'">リンク</a>';
  }
  
}

