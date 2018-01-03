module.exports = function (game,x,y,max_width,content) {
	
	var line = [];
	var wordIndex = 0;
	var lineIndex = 0;

	var wordDelay = 120;
	var lineDelay = 400;

	var Text = game.add.text(x, y, '', { font: "20px Microsoft JhengHei", fill: "#000000", wordWrap: true, wordWrapWidth: max_width });
	nextLine();

	function nextLine() {

		if (lineIndex === content.length)
		{
			//  We're finished
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
		Text.text = Text.text.concat(line[wordIndex] + " ");

		//  Advance the word index to the next word in the line
		wordIndex++;

		//  Last word?
		if (wordIndex === line.length)
		{
			//  Add a carriage return
			Text.text = Text.text.concat("\n");

			//  Get the next line after the lineDelay amount of ms has elapsed
			game.time.events.add(lineDelay, nextLine, this);
		}

	}
	
	return Text;
}
