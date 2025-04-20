// DLリンク一覧をDLメソッドに渡す
async function downloadFiles(downloadLinks) {
	for (const link of downloadLinks) {
		try {
			await downloadFile(link);
		} catch (error) {
			console.error('Download failed: ${link.href}', error);
			alert('ダウンロードに失敗しました: ${link.href}\n${error}');
			return; 
		}
	}
	alert('すべてダウンロード完了しました！');
}

// DLする
function downloadFile(link) {
	return new Promise(resolve => {
		const fileName = link.href.split('/').pop();
		const a = document.createElement('a');
		a.href = link.href;
		a.download = fileName;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();

		setTimeout(() => {
			document.body.removeChild(a);
			resolve();
		}, 1000);
	});
}

// DLリンク一覧取得
function getDownloadLinks() {
	const downloadLinks = [];
	const aTags = document.querySelectorAll('a.nav-reverse');
	aTags.forEach(aTag => {
		if (aTag.href.startsWith('https://booth.pm/downloadables/')) {
			downloadLinks.push(aTag);
		}
	});
	return downloadLinks;
}

// DLボタン追加
function addDownloadButton() {
	const targetDiv = document.querySelector('div.mobile\\:pt-16.flex.gap-8');
	if (targetDiv) {
		const downloadButton = document.createElement('button');
		downloadButton.textContent = '一括DL';
		downloadButton.classList.add('btn', 'small', 'calm', 'mobile-full-length', 'icon-download'); 
		downloadButton.style.marginTop = '16px'; 
		downloadButton.addEventListener('click', () => {
			const downloadLinks = getDownloadLinks();
			if (downloadLinks.length > 0) {
				downloadFiles(downloadLinks);
			} else {
				alert('ダウンロード可能なファイルが見つかりませんでした。');
			}
		});
		targetDiv.appendChild(downloadButton);
	}
}

// ページロード時イベント
window.addEventListener('load', () => {
	addDownloadButton();
	const streamSaverScript = document.createElement('script');
	streamSaverScript.src = 'https://cdn.jsdelivr.net/npm/streamsaver@2.0.6/StreamSaver.min.js';
	document.head.appendChild(streamSaverScript);
});
