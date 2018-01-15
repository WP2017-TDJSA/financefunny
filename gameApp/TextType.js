module.exports = function (game,x,y,width,content,align=undefined) {
	
	var line = [];
	var wordIndex = 0;
	var lineIndex = 0;

	var wordDelay = 130;
	var lineDelay = 400;
	if(!game.device.desktop){
		var style = { font: "20px Microsoft JhengHei", fill: "#000000", wordWrap: true, wordWrapWidth: width }
	}
	else{
		var style = { font: "24px Microsoft JhengHei", fill: "#000000", wordWrap: true, wordWrapWidth: width }
	}
	if (align)
		style.align = align;
	var _text = game.add.text(x, y, '', style)
	_text.events.onShowAllContent = new Phaser.Signal(); 

	nextLine();

	function nextLine() {

		if (lineIndex === content.length)
		{
			//  We're finished
			_text.events.onShowAllContent.dispatch();
			
			return;
		}

		//  Split the current line on spaces, so one word per array element
		line = content[lineIndex].split(' ');

		//  Reset the word index to zero (the first word in the line)
		wordIndex = 0;

		//  Call the 'nextWord' function once for each word in the line (line.length)
		game.time.events.repeat(wordDelay, line.length, nextWord, this);

		//  Advance to the next line
		lineIndex++;

	}

	function nextWord() {

		//  Add the next word onto the text string, followed by a space
		_text.text = _text.text.concat(line[wordIndex] + " ");

		//  Advance the word index to the next word in the line
		wordIndex++;

		//  Last word?
		if (wordIndex === line.length)
		{
			//  Add a carriage return
			_text.text = _text.text.concat("\n");

			//  Get the next line after the lineDelay amount of ms has elapsed
			game.time.events.add(lineDelay, nextLine, this);
		}

	}
	
	return _text;
}
