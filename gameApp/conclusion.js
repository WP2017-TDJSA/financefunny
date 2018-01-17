module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] conclusion')
			
        },
        create : function() {
			
			var content = ["在 這 個 遊 戲 中 我 們 了 解 了 集 合 競 價 的 概 念",
				"買 方 與 賣 方 要 在 價 格 的 競 爭 中 取 得 平 衡",
				"決 定 適 當 的 成 交 價 以 達 到 「 最 大 成 交 量 」",
				"",
				"從 典 型 人 物 身 上 看 到 股 市 中 常 見 的 心 理 、 操 作 手 法",
				"在 沙 盒 模 式 裡 改 變 參 數 來 觀 察 股 價 的 變 化",
				"",
				"現 實 中 的 股 票 市 場 複 雜 很 多",
				"我 們 謹 以 遊 戲 呈 現 帶 大 家 了 解 最 基 本 的 概 念",
				"",
				"最 後 . . . . . .",
				"謝 謝 您 來 玩 我 們 的 遊 戲 !",
				"希 望 您 有 所 收 穫 ~"
			];
			var introduction = require('./TextType')(game, game.world.centerX, game.world.centerY+20, game.width*0.8, content, "center")
			introduction.anchor.set(0.5);
        },
        update : function() {
			
        }
    };
}