(() => {
  "use strict";

  const LY_MM = 9460730472580800000n;
  const AU_MM = 149597870700000n;
  const TARGETS = [
    { id:"centimeter", name:"身近なもの", short:"1 cm · 身近なもの", icon:"🖊️", mm:10n, unit:"1 cm", kind:"身近な長さ", description:"クリップや鉛筆の太さと比べられる、小さな一歩。", chapter:"第1章 · はじまり", comparison:"紙の厚さと身近な長さの比較" },
    { id:"person", name:"人の身長", short:"人の身長", icon:"🧍", mm:1000n, unit:"約1 m", kind:"人間の身長", description:"人の身長を目安にした比較です。", chapter:"第1章 · はじまり", comparison:"紙の厚さと人の身長の比較" },
    { id:"tokyo-tower", name:"東京タワー", short:"東京タワー", icon:"🗼", mm:333000n, unit:"約333 m", kind:"電波塔の高さ", description:"東京タワーの高さを基準にしています。", chapter:"第1章 · くらべてみよう", comparison:"紙の厚さと建物の高さの比較" },
    { id:"skytree", name:"東京スカイツリー", short:"東京スカイツリー", icon:"🏙️", mm:634000n, unit:"約634 m", kind:"電波塔の高さ", description:"東京スカイツリーの高さ、634 mとの比較です。", chapter:"第1章 · くらべてみよう", comparison:"紙の厚さと建物の高さの比較" },
    { id:"harukas", name:"あべのハルカス", short:"あべのハルカス", icon:"🏢", mm:1017000n, unit:"約1,017 m", kind:"建物の高さ（目安）", description:"高さ約300 mの超高層ビル。ゲーム内では指定の1,017 mを比較目標として採用。", chapter:"第1章 · くらべてみよう", comparison:"紙の厚さとゲーム用の高さ目標の比較" },
    { id:"fuji", name:"富士山", short:"富士山", icon:"🗻", mm:3776000n, unit:"3,776 m", kind:"山の標高", description:"山頂の海抜標高です。建物の地上高とは基準が異なります。", chapter:"第1章 · 山を越えて", comparison:"紙の厚さと海抜標高の比較" },
    { id:"everest", name:"エベレスト", short:"エベレスト", icon:"🏔️", mm:8849000n, unit:"約8,849 m", kind:"山の標高", description:"海面からの標高の目安です。", chapter:"第1章 · 山を越えて", comparison:"紙の厚さと海抜標高の比較" },
    { id:"space", name:"宇宙空間の目安", short:"宇宙空間", icon:"🚀", mm:100000000n, unit:"100 km", kind:"高度の目安", description:"高度100 kmを宇宙空間のゲーム上の目安としています。", chapter:"第1章 · 宇宙へ", comparison:"紙の厚さと高度100 kmの比較" },
    { id:"moon", name:"月", short:"月", icon:"🌙", mm:384400000000n, unit:"約384,400 km", kind:"地球からの平均距離", description:"地球の中心から月までの平均距離。月そのものの直径との比較ではありません。", chapter:"第2章 · 太陽系", comparison:"紙の厚さと地球から月までの平均距離の比較", special:"moon" },
    { id:"sun", name:"太陽", short:"太陽", icon:"☀️", mm:149600000000000n, unit:"約1億4,960万 km", kind:"地球からの平均距離", description:"地球から太陽までの平均距離（約1天文単位）です。", chapter:"第2章 · 太陽系", comparison:"紙の厚さと地球から太陽までの平均距離の比較" },
    { id:"neptune", name:"海王星", short:"海王星", icon:"🔵", mm:4500000000000000n, unit:"約45億 km", kind:"地球からの概算距離", description:"軌道により変化するため、ゲーム用の固定目安です。", chapter:"第2章 · 太陽系", comparison:"紙の厚さと地球からの概算距離の比較" },
    { id:"pluto", name:"冥王星", short:"冥王星", icon:"🪐", mm:5900000000000000n, unit:"約59億 km", kind:"地球からの概算距離", description:"軌道上の位置で変わるため、ゲーム用の固定目安です。", chapter:"第2章 · 太陽系", comparison:"紙の厚さと地球からの概算距離の比較" },
    { id:"voyager", name:"ボイジャー1号", short:"ボイジャー1号", icon:"🛰️", mm:25000000000000000n, unit:"約250億 km", kind:"地球からのゲーム用距離", description:"変化する探査機の距離を、約250億 kmの固定目安として採用。", chapter:"第2章 · 太陽系", comparison:"紙の厚さと地球からのゲーム用距離の比較" },
    { id:"proxima", name:"プロキシマ・ケンタウリ", short:"プロキシマ・ケンタウリ", icon:"🔴", mm:LY_MM * 424n / 100n, unit:"約4.24 光年", kind:"地球からの距離", description:"太陽に最も近い恒星。距離は概算値です。", chapter:"第3章 · 恒星へ", comparison:"紙の厚さと地球から恒星までの距離の比較" },
    { id:"alpha-centauri", name:"アルファ・ケンタウリ", short:"アルファ・ケンタウリ", icon:"✨", mm:LY_MM * 437n / 100n, unit:"約4.37 光年", kind:"地球からの距離", description:"太陽系に近い恒星系。距離は概算値です。", chapter:"第3章 · 恒星へ", comparison:"紙の厚さと地球から恒星までの距離の比較" },
    { id:"sirius", name:"シリウス", short:"シリウス", icon:"⭐", mm:LY_MM * 86n / 10n, unit:"約8.6 光年", kind:"地球からの距離", description:"夜空で明るく見える恒星のひとつです。", chapter:"第3章 · 恒星へ", comparison:"紙の厚さと地球から恒星までの距離の比較" },
    { id:"vega", name:"ベガ", short:"ベガ", icon:"🌟", mm:LY_MM * 25n, unit:"約25 光年", kind:"地球からの距離", description:"こと座の明るい恒星。距離は概算値です。", chapter:"第3章 · 恒星へ", comparison:"紙の厚さと地球から恒星までの距離の比較" },
    { id:"betelgeuse", name:"ベテルギウス", short:"ベテルギウス", icon:"🔴", mm:LY_MM * 642n, unit:"約642 光年", kind:"地球からの距離", description:"オリオン座の赤色超巨星。距離は概算値です。", chapter:"第3章 · 恒星へ", comparison:"紙の厚さと地球から恒星までの距離の比較" },
    { id:"orion", name:"オリオン腕近傍", short:"オリオン腕近傍", icon:"🌌", mm:LY_MM * 1300n, unit:"約1,300 光年", kind:"地球からの距離（代表目安）", description:"オリオン腕の近傍を示す代表的な概算距離です。", chapter:"第4章 · 天の川銀河", comparison:"紙の厚さと地球からの距離目安の比較" },
    { id:"galactic-center", name:"天の川銀河の中心", short:"銀河の中心", icon:"🌀", mm:LY_MM * 26000n, unit:"約26,000 光年", kind:"地球からの距離", description:"銀河中心までの太陽系からの距離です。", chapter:"第4章 · 天の川銀河", comparison:"紙の厚さと地球から銀河中心までの距離の比較" },
    { id:"milky-edge", name:"天の川銀河の外縁", short:"天の川銀河の外縁", icon:"🌌", mm:LY_MM * 75000n, unit:"約75,000 光年", kind:"地球からのゲーム用距離目安", description:"銀河の外縁までの、ゲーム用の代表的な距離目安です。", chapter:"第4章 · 天の川銀河", comparison:"紙の厚さと地球から銀河外縁までの距離目安の比較" },
    { id:"milky-diameter", name:"天の川銀河の直径", short:"天の川の直径", icon:"🌌", mm:LY_MM * 100000n, unit:"約10万 光年", kind:"銀河の直径（大きさ）", description:"地球からの距離ではなく、銀河そのものの直径との規模比較です。", chapter:"第4章 · 天の川銀河", comparison:"紙の厚さと銀河自体の直径（大きさ）の比較" },
    { id:"lmc", name:"大マゼラン雲", short:"大マゼラン雲", icon:"☁️", mm:LY_MM * 160000n, unit:"約16万 光年", kind:"地球からの距離", description:"天の川銀河の近くを回る伴銀河です。", chapter:"第5章 · 銀河を越えて", comparison:"紙の厚さと地球から銀河までの距離の比較" },
    { id:"smc", name:"小マゼラン雲", short:"小マゼラン雲", icon:"☁️", mm:LY_MM * 200000n, unit:"約20万 光年", kind:"地球からの距離", description:"天の川銀河の近くにある伴銀河です。", chapter:"第5章 · 銀河を越えて", comparison:"紙の厚さと地球から銀河までの距離の比較" },
    { id:"andromeda", name:"アンドロメダ銀河", short:"アンドロメダ銀河", icon:"🌀", mm:LY_MM * 2540000n, unit:"約254万 光年", kind:"地球からの距離", description:"天の川銀河に最も近い大きな渦巻銀河。大切な宇宙探索の中間目標です。", chapter:"第5章 · 銀河を越えて", comparison:"紙の厚さと地球からアンドロメダ銀河までの距離の比較", special:"andromeda" },
    { id:"triangulum", name:"さんかく座銀河", short:"さんかく座銀河", icon:"🌌", mm:LY_MM * 2730000n, unit:"約273万 光年", kind:"地球からの距離", description:"局所銀河群にある渦巻銀河です。距離は概算値です。", chapter:"第5章 · 銀河を越えて", comparison:"紙の厚さと地球から銀河までの距離の比較" },
    { id:"local-group", name:"局所銀河群の広がり", short:"局所銀河群", icon:"✨", mm:LY_MM * 10000000n, unit:"約1,000万 光年", kind:"銀河群の広がり（規模）", description:"銀河群の広がりを表す規模の目安。地球からの距離とは異なります。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと銀河群の広がり（規模）の比較" },
    { id:"virgo-cluster", name:"おとめ座銀河団", short:"おとめ座銀河団", icon:"✨", mm:LY_MM * 50000000n, unit:"約5,000万 光年", kind:"地球からの距離目安", description:"おとめ座銀河団までの代表的な概算距離です。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと地球から銀河団までの距離目安の比較" },
    { id:"virgo-supercluster", name:"おとめ座超銀河団", short:"おとめ座超銀河団", icon:"🌠", mm:LY_MM * 100000000n, unit:"約1億 光年", kind:"構造の広がり（規模）", description:"超銀河団の広がりを表す規模の目安です。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと超銀河団の広がり（規模）の比較" },
    { id:"great-attractor", name:"グレート・アトラクター", short:"グレート・アトラクター", icon:"🧲", mm:LY_MM * 150000000n, unit:"約1億5,000万 光年", kind:"地球からのゲーム用距離目安", description:"複雑な銀河流を伴う領域。ゲーム内では固定した距離目安を使用。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと地球からのゲーム用距離目安の比較" },
    { id:"laniakea", name:"ラニアケア超銀河団", short:"ラニアケア超銀河団", icon:"🌌", mm:LY_MM * 500000000n, unit:"約5億 光年", kind:"構造の広がり（規模）", description:"超銀河団の広がりを表す概算規模で、地球からの距離とは区別しています。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと超銀河団の広がり（規模）の比較" },
    { id:"shapley", name:"シャプレー超銀河団", short:"シャプレー超銀河団", icon:"💫", mm:LY_MM * 650000000n, unit:"約6億5,000万 光年", kind:"地球からの距離目安", description:"シャプレー超銀河団の代表的な距離目安です。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと地球からの距離目安の比較" },
    { id:"filament", name:"宇宙の巨大なフィラメント", short:"巨大フィラメント", icon:"🌌", mm:LY_MM * 1000000000n, unit:"約10億 光年", kind:"宇宙構造の広がり（規模）", description:"宇宙の網目構造の広がりを表す代表的な規模です。", chapter:"第6章 · 大規模構造", comparison:"紙の厚さと宇宙構造の広がり（規模）の比較" },
    { id:"observable-universe", name:"観測可能な宇宙の半径", short:"観測可能な宇宙の果て", icon:"🌌", mm:LY_MM * 46500000000n, unit:"約465億 光年", kind:"観測可能な宇宙の半径", description:"宇宙全体の端ではなく、観測可能な宇宙の半径を最終目標にしています。", chapter:"最終章 · 宇宙の果て", comparison:"紙の厚さと観測可能な宇宙の半径の比較", special:"final" }
  ];
  const STORAGE_KEY = "paper-folding-cosmic-v1";
  const DEFAULT_SAVE = { currentFolds:0, currentXFolds:0, currentYFolds:0, bestFolds:0, bestLogMm:-1, unlocked:[], totalFolds:0, clears:[], sound:true };
  const $ = (id) => document.getElementById(id);
  const canvas = $("paper-canvas");
  const ctx = canvas.getContext("2d");
  let loadError = false;
  const savedData = loadSave();
  const state = { folds:savedData.currentFolds, xFolds:savedData.currentXFolds, yFolds:savedData.currentYFolds, axis:"x", edge:"right", dragging:false, pointerId:null, start:null, point:null, crease:null, flap:null, width:0, height:0, baseWidth:0, baseHeight:0, busy:false, completed:savedData.unlocked.includes("observable-universe"), eventQueue:[], save:savedData, toastTimer:null, audio:null };

  function loadSave() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!value || typeof value !== "object") return { ...DEFAULT_SAVE };
      return {
        currentFolds:Number.isSafeInteger(value.currentFolds) && value.currentFolds >= 0 ? Math.min(value.currentFolds, 1000) : 0,
        currentXFolds:Number.isSafeInteger(value.currentXFolds) && value.currentXFolds >= 0 ? Math.min(value.currentXFolds, 1000) : 0,
        currentYFolds:Number.isSafeInteger(value.currentYFolds) && value.currentYFolds >= 0 ? Math.min(value.currentYFolds, 1000) : 0,
        bestFolds:Number.isSafeInteger(value.bestFolds) && value.bestFolds >= 0 ? value.bestFolds : 0,
        bestLogMm:typeof value.bestLogMm === "number" && Number.isFinite(value.bestLogMm) ? value.bestLogMm : -1,
        unlocked:Array.isArray(value.unlocked) ? [...new Set(value.unlocked.filter(id => TARGETS.some(goal => goal.id === id)))] : [],
        totalFolds:Number.isSafeInteger(value.totalFolds) && value.totalFolds >= 0 ? value.totalFolds : 0,
        clears:Array.isArray(value.clears) ? value.clears.filter(item => item && Number.isSafeInteger(item.folds) && typeof item.date === "string").slice(-10) : [],
        sound:typeof value.sound === "boolean" ? value.sound : true
      };
    } catch (error) {
      console.error("保存データを読み込めませんでした。", error);
      loadError = true;
      return { ...DEFAULT_SAVE };
    }
  }

  function animateFold(fromWidth, fromHeight, toWidth, toHeight) {
    const start = performance.now();
    const duration = 230;
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      state.width = fromWidth + (toWidth - fromWidth) * eased;
      state.height = fromHeight + (toHeight - fromHeight) * eased;
      drawPaper();
      if (progress < 1) requestAnimationFrame(frame);
      else {
        state.width = toWidth;
        state.height = toHeight;
        drawPaper();
      }
    }
    requestAnimationFrame(frame);
  }

  function saveGame() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.save));
      document.body.classList.remove("storage-warning");
    } catch (error) {
      console.error("ゲームの記録を保存できませんでした。", error);
      document.body.classList.add("storage-warning");
      showToast("記録を保存できません。ブラウザーの保存容量をご確認ください。");
    }
  }

  function thicknessNumerator(folds = state.folds) { return 1n << BigInt(folds); }
  function compareToGoal(folds, goal) { return thicknessNumerator(folds) > goal.mm * 10n; }
  function log10BigInt(value) {
    const text = value.toString();
    return text.length - 1 + Math.log10(Number(text.slice(0, 15)) / 10 ** (Math.min(15, text.length) - 1));
  }
  function formatQuantity(numerator, denominator, units, significant = 4) {
    if (numerator === 0n) return "0";
    const logValue = log10BigInt(numerator) - log10BigInt(denominator);
    let unit = units[0];
    for (const candidate of units) if (logValue - log10BigInt(candidate.factor) >= 0) unit = candidate;
    const scaledLog = logValue - log10BigInt(unit.factor);
    const exponent = Math.floor(scaledLog);
    const mantissa = 10 ** (scaledLog - exponent);
    const rounded = Number(mantissa.toPrecision(significant));
    const normalized = rounded >= 10 ? rounded / 10 : rounded;
    const finalExponent = rounded >= 10 ? exponent + 1 : exponent;
    if (finalExponent >= 6 || finalExponent <= -3) {
      const coefficient = normalized.toFixed(significant - 1).replace(/\.?0+$/, "");
      return `${coefficient}e${finalExponent} ${unit.name}`;
    }
    const amount = normalized * 10 ** finalExponent;
    const digits = amount >= 100 ? 0 : amount >= 10 ? 1 : 2;
    const display = amount >= 1e6 || amount < 0.01 ? amount.toExponential(2).replace(/\.?0+e/, "e") : amount.toLocaleString("ja-JP", { maximumFractionDigits:digits });
    return `${display} ${unit.name}`;
  }

  const UNITS = [
    { name:"mm", factor:1n },
    { name:"m", factor:1000n },
    { name:"km", factor:1000000n },
    { name:"AU", factor:AU_MM },
    { name:"光年", factor:LY_MM }
  ];
  function formatThickness(folds = state.folds) {
    return formatQuantity(thicknessNumerator(folds), 10n, UNITS, 4);
  }
  function formatGoal(goal) {
    if (goal.unit) return goal.unit;
    return formatQuantity(goal.mm, 1n, UNITS, 4);
  }
  function thicknessLogMm(folds = state.folds) { return folds * Math.LOG10E * Math.LN2 - 1; }
  function currentGoalIndex() { return TARGETS.findIndex(goal => !state.save.unlocked.includes(goal.id)); }
  function progressToGoal(goal) {
    const logRatio = thicknessLogMm() - log10BigInt(goal.mm);
    return Math.max(0, Math.min(100, 10 ** logRatio * 100));
  }

  function render() {
    const index = currentGoalIndex();
    const goal = index < 0 ? TARGETS[TARGETS.length - 1] : TARGETS[index];
    $("fold-count").textContent = state.folds.toLocaleString("ja-JP");
    $("thickness-value").textContent = formatThickness();
    $("thickness-gain").textContent = state.folds ? `+${formatThickness(state.folds - 1)} 相当` : "—";
    $("best-folds").textContent = `${Math.max(state.save.bestFolds, state.folds).toLocaleString("ja-JP")} 回`;
    $("total-folds").textContent = `${state.save.totalFolds.toLocaleString("ja-JP")} 回`;
    $("live-badge").lastChild.textContent = state.completed ? " 宇宙の果てに到達" : " 操作できます";
    $("goal-count").textContent = `${state.save.unlocked.length} / ${TARGETS.length}`;
    $("mission-index").textContent = String(index < 0 ? TARGETS.length : index + 1).padStart(2, "0");
    if (index < 0) {
      $("target-name").textContent = "すべての目標を達成！";
      $("target-value").textContent = "宇宙の果てに到達しました";
      $("progress-label").textContent = "100%";
      $("progress-bar").style.width = "100%";
      $("progress-detail").textContent = "旅の記録はいつでも見返せます";
      $("mission-title").textContent = "宇宙の果てに到達！";
      $("mission-icon").textContent = "🌌";
      $("mission-description").textContent = "観測可能な宇宙の半径を超えました。壮大な旅の達成です。";
      $("mission-remaining").textContent = "すべての目標達成";
      $("stage-label").textContent = "最終章 · クリア";
    } else {
      const percentage = progressToGoal(goal);
      $("target-name").textContent = goal.short;
      $("target-value").textContent = formatGoal(goal);
      $("progress-label").textContent = `${percentage < 10 ? percentage.toFixed(1) : Math.floor(percentage)}%`;
      $("progress-bar").style.width = `${percentage}%`;
      $("progress-detail").textContent = `あと ${remainingText(goal)}`;
      $("mission-title").textContent = goal.name === "身近なもの" ? "小さな一歩" : `${goal.short}を目指そう`;
      $("mission-icon").textContent = goal.icon;
      $("mission-description").textContent = goal.description;
      $("mission-remaining").textContent = `あと ${remainingText(goal)}`;
      $("stage-label").textContent = goal.chapter;
    }
    renderMilestones();
    updatePaperSize();
    drawPaper();
  }

  function remainingText(goal) {
    if (compareToGoal(state.folds, goal)) return "到達！";
    const targetLog = log10BigInt(goal.mm * 10n) - 1;
    const currentLog = thicknessLogMm();
    if (targetLog - currentLog < 6) {
      const goalMm = targetLog < 15 ? Number(goal.mm) : Infinity;
      if (Number.isFinite(goalMm)) return formatQuantity(goal.mm * 10n - thicknessNumerator(), 10n, UNITS, 3);
    }
    return formatGoal(goal);
  }

  function renderMilestones() {
    const container = $("milestone-list");
    container.replaceChildren();
    const highlight = currentGoalIndex();
    const indices = [...Array(3)].map((_, i) => Math.min(Math.max(0, highlight - 1) + i, TARGETS.length - 1));
    [...new Set(indices)].forEach(index => {
      const goal = TARGETS[index];
      const done = state.save.unlocked.includes(goal.id);
      const row = document.createElement("div");
      row.className = `milestone-row${done ? " done" : ""}`;
      const icon = document.createElement("span");
      icon.className = "milestone-dot";
      icon.textContent = done ? "✓" : "·";
      const name = document.createElement("span");
      name.textContent = goal.short;
      const status = document.createElement("small");
      status.textContent = done ? "達成" : formatGoal(goal);
      row.append(icon, name, status);
      container.append(row);
    });
  }

  function paperDimension(baseMillimeters, foldCount) {
    if (foldCount <= 6) {
      const exactMillimeters = baseMillimeters / 2 ** foldCount;
      const decimals = Math.min(foldCount, 6);
      return `${exactMillimeters.toFixed(decimals).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")} mm`;
    }
    return formatQuantity(BigInt(baseMillimeters), 1n << BigInt(foldCount), UNITS, 4);
  }

  function updatePaperSize() {
    const rect = $("paper-stage").getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const maxW = Math.min(380, rect.width * .68);
    const maxH = Math.min(230, rect.height * .76);
    const aspectLog2 = Math.log2(210 / 297) + state.yFolds - state.xFolds;
    const aspect = 2 ** aspectLog2;
    let width = maxW, height = width / aspect;
    if (height > maxH) { height = maxH; width = height * aspect; }
    state.baseWidth = width;
    state.baseHeight = height;
    state.width = width;
    state.height = height;
    const horizontal = paperDimension(210, state.xFolds);
    const vertical = paperDimension(297, state.yFolds);
    $("paper-size-label").textContent = `横 ${horizontal} × 縦 ${vertical}${state.folds ? ` · ${state.folds}回折り` : " · A4"}`;
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }

  function pointFor(x, y) {
    const rect = canvas.getBoundingClientRect();
    return { x:x - rect.left, y:y - rect.top };
  }

  function paperRect() {
    return { x:(canvas.clientWidth - state.width) / 2, y:(canvas.clientHeight - state.height) / 2, width:state.width, height:state.height };
  }

  function drawPaper() {
    if (!ctx || !canvas.clientWidth) return;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const rect = paperRect();
    const midX = rect.x + rect.width / 2, midY = rect.y + rect.height / 2;
    const stackOffset = Math.min(12, state.folds * .65);
    if (stackOffset > 0) {
      ctx.fillStyle = "#e8e4db";
      ctx.fillRect(rect.x + stackOffset * .3, rect.y + stackOffset * .5, rect.width, rect.height);
      ctx.fillStyle = "#f4f1e9";
      ctx.fillRect(rect.x + stackOffset * .14, rect.y + stackOffset * .25, rect.width, rect.height);
    }
    ctx.save();
    ctx.shadowColor = "rgba(61, 54, 36, .19)";
    ctx.shadowBlur = 17;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#fffefa";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.restore();
    ctx.strokeStyle = "#ece9e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(rect.x + .5, rect.y + .5, rect.width - 1, rect.height - 1);
    ctx.save();
    ctx.beginPath();
    if (state.axis === "x") { ctx.moveTo(midX, rect.y + 8); ctx.lineTo(midX, rect.y + rect.height - 8); }
    else { ctx.moveTo(rect.x + 8, midY); ctx.lineTo(rect.x + rect.width - 8, midY); }
    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = state.dragging ? "#8777db" : "#d2cedf";
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = "#8878d4";
    ctx.beginPath();
    if (state.axis === "x") {
      const direction = state.edge === "right" ? -1 : 1;
      const tipX = midX + direction * 7;
      ctx.moveTo(tipX, midY);
      ctx.lineTo(tipX - direction * 8, midY - 6);
      ctx.lineTo(tipX - direction * 8, midY + 6);
    } else {
      const direction = state.edge === "bottom" ? -1 : 1;
      const tipY = midY + direction * 7;
      ctx.moveTo(midX, tipY);
      ctx.lineTo(midX - 6, tipY - direction * 8);
      ctx.lineTo(midX + 6, tipY - direction * 8);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    if (state.dragging && state.point && state.start) drawFlap(rect);
    else {
      const px = state.edge === "right" ? rect.x + rect.width : state.edge === "left" ? rect.x : midX;
      const py = state.edge === "bottom" ? rect.y + rect.height : state.edge === "top" ? rect.y : midY;
      ctx.beginPath();
      ctx.arc(px - (state.edge === "right" ? 5 : state.edge === "left" ? -5 : 0), py - (state.edge === "bottom" ? 5 : state.edge === "top" ? -5 : 0), 3, 0, Math.PI * 2);
      ctx.fillStyle = "#8273cf";
      ctx.fill();
    }
      drawPaperDimensions(rect);
  }

  function drawPaperDimensions(rect) {
      const horizontal = paperDimension(210, state.xFolds);
      const vertical = paperDimension(297, state.yFolds);
      ctx.save();
      ctx.font = "600 9px sans-serif";
      ctx.fillStyle = "#70678f";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const topY = rect.y + Math.min(18, rect.height * .12);
      ctx.strokeStyle = "#9b90c5";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rect.x + 13, topY);
      ctx.lineTo(rect.x + rect.width - 13, topY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rect.x + 13, topY - 3);
      ctx.lineTo(rect.x + 13, topY + 3);
      ctx.moveTo(rect.x + rect.width - 13, topY - 3);
      ctx.lineTo(rect.x + rect.width - 13, topY + 3);
      ctx.stroke();
      ctx.fillStyle = "#fffefa";
      const horizontalLabelWidth = Math.max(62, ctx.measureText(`横 ${horizontal}`).width + 10);
      ctx.fillRect(rect.x + rect.width / 2 - horizontalLabelWidth / 2, topY - 8, horizontalLabelWidth, 16);
      ctx.fillStyle = "#70678f";
      ctx.fillText(`横 ${horizontal}`, rect.x + rect.width / 2, topY);

      const sideX = rect.x + rect.width - Math.min(15, rect.width * .1);
      ctx.strokeStyle = "#9b90c5";
      ctx.beginPath();
      ctx.moveTo(sideX, rect.y + 34);
      ctx.lineTo(sideX, rect.y + rect.height - 13);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sideX - 3, rect.y + 34);
      ctx.lineTo(sideX + 3, rect.y + 34);
      ctx.moveTo(sideX - 3, rect.y + rect.height - 13);
      ctx.lineTo(sideX + 3, rect.y + rect.height - 13);
      ctx.stroke();
      ctx.translate(sideX - 2, rect.y + (rect.height + 21) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#fffefa";
      const verticalLabelWidth = Math.max(62, ctx.measureText(`縦 ${vertical}`).width + 10);
      ctx.fillRect(-verticalLabelWidth / 2, -8, verticalLabelWidth, 16);
      ctx.fillStyle = "#70678f";
      ctx.fillText(`縦 ${vertical}`, 0, 0);
      ctx.restore();
  }

  function drawFlap(rect) {
    const p = state.point;
    ctx.save();
    if (state.axis === "x") {
      const edge = state.edge === "right" ? rect.x + rect.width : rect.x;
      const crease = state.crease ?? rect.x + rect.width / 2;
      const clipped = Math.max(rect.x, Math.min(rect.x + rect.width, p.x));
      ctx.beginPath();
      ctx.moveTo(crease, rect.y);
      ctx.lineTo(clipped, rect.y);
      ctx.lineTo(clipped, rect.y + rect.height);
      ctx.lineTo(crease, rect.y + rect.height);
      ctx.closePath();
      ctx.fillStyle = "rgba(221, 215, 242, .64)";
      ctx.shadowColor = "#5a4c91aa";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(105, 91, 165, .54)";
      ctx.lineWidth = 1;
      ctx.stroke();
      const progress = Math.max(0, Math.min(1, (state.edge === "right" ? edge - p.x : p.x - edge) / Math.max(1, rect.width / 2)));
      const foldAngle = progress * Math.PI;
      ctx.beginPath();
      ctx.moveTo(crease, rect.y);
      const curveOffset = Math.sin(foldAngle) * rect.width * .08 * (state.edge === "right" ? 1 : -1);
      ctx.bezierCurveTo(crease + curveOffset, rect.y + rect.height * .36, crease + curveOffset, rect.y + rect.height * .64, crease, rect.y + rect.height);
      ctx.strokeStyle = "#9789d1";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      const edge = state.edge === "bottom" ? rect.y + rect.height : rect.y;
      const crease = state.crease ?? rect.y + rect.height / 2;
      const clipped = Math.max(rect.y, Math.min(rect.y + rect.height, p.y));
      ctx.beginPath();
      ctx.moveTo(rect.x, crease);
      ctx.lineTo(rect.x, clipped);
      ctx.lineTo(rect.x + rect.width, clipped);
      ctx.lineTo(rect.x + rect.width, crease);
      ctx.closePath();
      ctx.fillStyle = "rgba(221, 215, 242, .64)";
      ctx.shadowColor = "#5a4c91aa";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(105, 91, 165, .54)";
      ctx.stroke();
      const progress = Math.max(0, Math.min(1, (state.edge === "bottom" ? edge - p.y : p.y - edge) / Math.max(1, rect.height / 2)));
      ctx.beginPath();
      ctx.moveTo(rect.x, crease);
      const curveOffset = Math.sin(progress * Math.PI) * rect.height * .08 * (state.edge === "bottom" ? 1 : -1);
      ctx.bezierCurveTo(rect.x + rect.width * .36, crease + curveOffset, rect.x + rect.width * .64, crease + curveOffset, rect.x + rect.width, crease);
      ctx.strokeStyle = "#9789d1";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }

  function setMessage(text, success = false) {
    const message = $("stage-message");
    message.textContent = text;
    message.classList.toggle("success", success);
  }

  function edgeInstruction(edge) {
    const instructions = { right:"右端から左端へ", left:"左端から右端へ", bottom:"下端から上端へ", top:"上端から下端へ" };
    return instructions[edge];
  }

  function selectAxis(axis, edge = axis === "x" ? "right" : "bottom") {
    if (state.busy || state.completed || state.dragging) return;
    state.axis = axis;
    state.edge = edge;
    $("horizontal-fold").classList.toggle("selected", axis === "x");
    $("vertical-fold").classList.toggle("selected", axis === "y");
    $("horizontal-fold").setAttribute("aria-pressed", String(axis === "x"));
    $("vertical-fold").setAttribute("aria-pressed", String(axis === "y"));
    $("fold-hint").textContent = `${edgeInstruction(edge)}ドラッグ`;
    canvas.setAttribute("aria-label", "紙の上・下・左・右の端をつかみ、反対側の端に合わせると折れます");
    drawPaper();
  }

  function pointerDown(event) {
    if (state.busy || state.completed || state.dragging) return;
    const point = pointFor(event.clientX, event.clientY);
    const rect = paperRect();
    const candidates = [
      { edge:"left", axis:"x", distance:Math.abs(point.x - rect.x), along:point.y >= rect.y - 20 && point.y <= rect.y + rect.height + 20, span:rect.width },
      { edge:"right", axis:"x", distance:Math.abs(point.x - (rect.x + rect.width)), along:point.y >= rect.y - 20 && point.y <= rect.y + rect.height + 20, span:rect.width },
      { edge:"top", axis:"y", distance:Math.abs(point.y - rect.y), along:point.x >= rect.x - 20 && point.x <= rect.x + rect.width + 20, span:rect.height },
      { edge:"bottom", axis:"y", distance:Math.abs(point.y - (rect.y + rect.height)), along:point.x >= rect.x - 20 && point.x <= rect.x + rect.width + 20, span:rect.height }
    ];
    const nearest = candidates.filter(candidate => candidate.along).sort((a, b) => a.distance - b.distance)[0];
    if (!nearest || nearest.distance > Math.max(27, nearest.span * .16)) {
      setMessage("紙の上・下・左・右の端をつかんでみよう");
      return;
    }
    event.preventDefault();
    state.axis = nearest.axis;
    state.edge = nearest.edge;
    $("horizontal-fold").classList.toggle("selected", state.axis === "x");
    $("vertical-fold").classList.toggle("selected", state.axis === "y");
    $("horizontal-fold").setAttribute("aria-pressed", String(state.axis === "x"));
    $("vertical-fold").setAttribute("aria-pressed", String(state.axis === "y"));
    $("fold-hint").textContent = `${edgeInstruction(state.edge)}ドラッグ`;
    canvas.setAttribute("aria-label", "紙の上・下・左・右の端をつかみ、反対側の端に合わせると折れます");
    canvas.setPointerCapture(event.pointerId);
    state.pointerId = event.pointerId;
    state.dragging = true;
    state.start = point;
    state.point = point;
    state.crease = state.axis === "x" ? rect.x + rect.width / 2 : rect.y + rect.height / 2;
    canvas.classList.add("dragging");
    setMessage(`${edgeInstruction(state.edge)}ぴったり合わせよう`);
    drawPaper();
  }

  function pointerMove(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    state.point = pointFor(event.clientX, event.clientY);
    drawPaper();
  }

  function pointerUp(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    const point = pointFor(event.clientX, event.clientY);
    state.point = point;
    const rect = paperRect();
    const target = state.edge === "right" ? rect.x : state.edge === "left" ? rect.x + rect.width : state.edge === "bottom" ? rect.y : rect.y + rect.height;
    const position = state.axis === "x" ? point.x : point.y;
    const span = state.axis === "x" ? rect.width : rect.height;
    const success = Math.abs(position - target) <= span * .05;
    state.dragging = false;
    state.pointerId = null;
    canvas.classList.remove("dragging");
    canvas.releasePointerCapture?.(event.pointerId);
    state.point = null;
    if (success) foldSuccess();
    else {
      state.crease = null;
      drawPaper();
      playTone(180, .07, "triangle");
      showFailureResult();
    }
  }

  function pointerCancel(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    state.crease = null;
    canvas.classList.remove("dragging");
    setMessage("紙が戻ったよ。もう一度折ってみよう");
    drawPaper();
  }

  function foldSuccess() {
    if (state.busy) return;
    const oldWidth = state.width, oldHeight = state.height;
    state.folds += 1;
    if (state.axis === "x") state.xFolds += 1;
    else state.yFolds += 1;
    state.save.currentFolds = state.folds;
    state.save.currentXFolds = state.xFolds;
    state.save.currentYFolds = state.yFolds;
    state.save.totalFolds += 1;
    state.save.bestFolds = Math.max(state.save.bestFolds, state.folds);
    state.save.bestLogMm = Math.max(state.save.bestLogMm, thicknessLogMm());
    const crossed = TARGETS.filter(goal => !state.save.unlocked.includes(goal.id) && compareToGoal(state.folds, goal));
    for (const goal of crossed) state.save.unlocked.push(goal.id);
    if (crossed.some(goal => goal.special === "final")) {
      state.completed = true;
      state.save.clears.push({ folds:state.folds, thickness:formatThickness(), date:new Date().toLocaleDateString("ja-JP") });
      state.save.clears = state.save.clears.slice(-10);
    }
    state.eventQueue = crossed;
    state.crease = null;
    render();
    const newWidth = state.width, newHeight = state.height;
    if (newWidth < oldWidth || newHeight < oldHeight) animateFold(oldWidth, oldHeight, newWidth, newHeight);
    saveGame();
    setMessage("ぴったり！ 半分に折れたよ。厚さが2倍！");
    playFoldSound();
    if (crossed.length) state.busy = true;
    setTimeout(() => {
      if (crossed.length) showNextEvent();
    }, 250);
  }

  function playTone(frequency, duration, type = "sine") {
    if (!state.save.sound) return;
    try {
      state.audio ||= new (window.AudioContext || window.webkitAudioContext)();
      if (state.audio.state === "suspended") state.audio.resume();
      const oscillator = state.audio.createOscillator(), gain = state.audio.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.055, state.audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, state.audio.currentTime + duration);
      oscillator.connect(gain).connect(state.audio.destination);
      oscillator.start();
      oscillator.stop(state.audio.currentTime + duration);
    } catch (error) { console.warn("効果音を再生できませんでした。", error); }
  }
  function playFoldSound() { playTone(520, .09); setTimeout(() => playTone(730, .12), 55); }
  function playMilestoneSound(special = false) {
    if (special) {
      [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => setTimeout(() => playTone(frequency, .38, "triangle"), index * 135));
      return;
    }
    playTone(520, .24);
    setTimeout(() => playTone(690, .32), 150);
  }

  function showFailureResult() {
    const failedFolds = state.folds;
    const failedThickness = formatThickness();
    const comments = [
      "今日はちょっとツイてないだけ。次はきっと決まるよ！",
      "おしい！ 紙も宇宙も、逃げたりしないから大丈夫。",
      "今日は紙がちょっと気まぐれ。深呼吸してもう一度！",
      "失敗は折り目のひとつ。次の一回で取り返そう！",
      "端まであと少し！ 指先のコツは、もうつかんでる。",
      "紙は元どおり。チャンスも元どおり、何度でもどうぞ！",
      "今日は肩ならしの日。次の一折りで流れを変えよう！",
      "ドンマイ！ 宇宙の果ては、そんなに急いでないよ。",
      "ぴったり折れなくても大丈夫。次こそピタッと！",
      "この紙、意外と手ごわいね。もう一回いってみよう！"
    ];
    state.busy = true;
    const overlay = $("event-overlay");
    const card = overlay.querySelector(".event-card");
    const sky = $("event-sky");
    card.classList.remove("special", "final-event");
    card.classList.add("failure-event");
    sky.className = "event-sky scene-failure";
    sky.querySelector(".event-procession")?.remove();
    $("event-art").textContent = "📄";
    $("event-kicker").textContent = "FOLD RESULT";
    $("event-title").textContent = "折り失敗！";
    $("event-description").textContent = "紙の端が合わず、今回の挑戦は最初からやり直しです。紙はA4に戻ります。";
    $("event-paper-label").textContent = "今回の紙の厚さ";
    $("event-paper").textContent = failedThickness;
    $("comparison-symbol").textContent = "·";
    $("event-goal-label").textContent = "折り回数";
    $("event-goal").textContent = `${failedFolds} 回`;
    $("event-times").textContent = "+0";
    $("event-times-unit").textContent = "mm";
    $("event-footnote").textContent = comments[Math.floor(Math.random() * comments.length)];
    state.shareText = `紙を${failedFolds}回折ったところで失敗…！ 厚さは${failedThickness}でした。`;
    $("event-backdrop").classList.remove("moon-backdrop");
    $("continue-button").textContent = "もう一度折る ↻";
    $("clear-retry-button").hidden = true;
    $("clear-settings-button").hidden = true;
    overlay.dataset.type = "failure";
    resetCurrentRun();
    overlay.hidden = false;
    $("continue-button").focus();
  }

  function showNextEvent() {
    const goal = state.eventQueue.shift();
    if (!goal) {
      state.busy = false;
      render();
      if (!state.completed) setMessage("次の目標を目指して、もう一度折ろう");
      return;
    }
    const overlay = $("event-overlay");
    const card = overlay.querySelector(".event-card");
    card.classList.toggle("special", goal.special === "moon" || goal.special === "andromeda");
    card.classList.toggle("final-event", goal.special === "final");
    const sky = $("event-sky");
    const scene = goal.special === "final" ? "universe"
      : goal.special === "moon" ? "moon"
        : goal.id === "sun" ? "sun"
          : goal.special === "andromeda" || /銀河|銀河団|超銀河団|フィラメント/.test(goal.kind + goal.name) ? "galaxy"
            : /恒星/.test(goal.kind) ? "stars"
              : /標高/.test(goal.kind) ? "mountain"
                : /建物の高さ|人間の身長/.test(goal.kind) ? "city"
                  : goal.id === "space" ? "space"
                    : goal.chapter.includes("太陽系") ? "solar" : "origin";
    sky.className = `event-sky scene-${scene}`;
    sky.querySelector(".event-procession")?.remove();
    overlay.dataset.type = "milestone";
    $("event-art").textContent = goal.icon;
    $("event-kicker").textContent = goal.special === "final" ? "THE EDGE OF THE OBSERVABLE UNIVERSE" : goal.special === "moon" ? "A SPECIAL LUNAR MILESTONE" : "MILESTONE REACHED";
    $("event-title").textContent = goal.special === "final" ? "宇宙の果てに到達！！" : `${goal.name}突破！！`;
    $("event-description").textContent = goal.special === "final"
      ? "あなたは紙の厚さで、観測可能な宇宙の半径を超えた！"
      : goal.special === "andromeda"
        ? "紙の厚さが地球からアンドロメダ銀河までの距離を超えた！"
        : goal.special === "moon"
          ? "紙の厚さが地球から月までの平均距離を超えた！"
          : `${goal.comparison}。宇宙の旅はまだまだ続く！`;
    $("event-paper").textContent = formatThickness();
    $("event-goal").textContent = formatGoal(goal);
    $("event-paper-label").textContent = "紙の厚さ";
    $("event-goal-label").textContent = "目標の距離";
    $("comparison-symbol").textContent = "÷";
    $("event-times-unit").textContent = "倍";
    const logRatio = thicknessLogMm() - log10BigInt(goal.mm);
    const ratio = 10 ** Math.min(300, logRatio);
    $("event-times").textContent = ratio >= 1e6 ? ratio.toExponential(2) : ratio.toLocaleString("ja-JP", { maximumFractionDigits:2 });
    $("event-footnote").textContent = goal.kind.includes("広がり") || goal.kind.includes("規模") || goal.kind.includes("直径")
      ? `比較対象：${goal.kind}。地球からその対象までの距離とは異なる、規模の比較です。`
      : `比較対象：${goal.kind}。${goal.special === "final" ? "宇宙全体の端ではなく、観測可能な宇宙の半径です。" : ""}`;
    state.shareText = goal.special === "final"
      ? `紙を${state.folds}回折って、観測可能な宇宙の半径を超えた！ 紙の厚さは${formatThickness()}！`
      : `紙を${state.folds}回折って、厚さ${formatThickness()}に！「${goal.name}」を突破しました。`;
    $("event-backdrop").classList.toggle("moon-backdrop", goal.special === "moon");
    $("clear-retry-button").hidden = goal.special !== "final";
    $("clear-settings-button").hidden = goal.special !== "final";
    if (goal.special === "final") {
      const procession = document.createElement("div");
      procession.className = "event-procession";
      TARGETS.filter(item => state.save.unlocked.includes(item.id)).slice(-8).forEach((item, index) => {
        const icon = document.createElement("span");
        icon.textContent = item.icon;
        icon.style.animationDelay = `${index * 140}ms`;
        procession.append(icon);
      });
      sky.append(procession);
    }
    overlay.hidden = false;
    $("continue-button").textContent = goal.special === "final" ? "クリア記録を見る →" : "旅を続ける →";
    $("continue-button").focus();
    playMilestoneSound(goal.special === "final" || goal.special === "moon");
  }

  function continueEvent() {
    if ($("event-overlay").hidden) return;
    if ($("event-overlay").dataset.type === "failure") {
      $("event-overlay").hidden = true;
      $("event-overlay").dataset.type = "";
      state.busy = false;
      setMessage(`${edgeInstruction(state.edge)}ぴったり合わせよう`);
      return;
    }
    const wasFinal = $("event-title").textContent.includes("宇宙の果て");
    $("event-overlay").hidden = true;
    if (wasFinal) {
      state.eventQueue = [];
      state.busy = false;
      render();
      openRecords();
      return;
    }
    showNextEvent();
  }

  function openModal(title, kicker, description, contentBuilder, actions = []) {
    $("modal-title").textContent = title;
    $("modal-kicker").textContent = kicker;
    $("modal-description").textContent = description;
    const grid = $("atlas-grid");
    grid.replaceChildren();
    contentBuilder(grid);
    const actionArea = $("modal-actions");
    actionArea.replaceChildren();
    actions.forEach(action => {
      const button = document.createElement("button");
      button.className = action.primary ? "primary-button" : "secondary-button";
      button.type = "button";
      button.textContent = action.label;
      button.addEventListener("click", action.run);
      actionArea.append(button);
    });
    $("modal-overlay").hidden = false;
    $("close-modal").focus();
  }

  function openAtlas(showAll = true) {
    const unlockedCount = state.save.unlocked.length;
    openModal("天体図鑑", "COSMIC FIELD GUIDE", `${unlockedCount} / ${TARGETS.length} の目標を解放。未到達の天体はシルエットで表示されます。距離と天体・構造そのものの大きさを分けて記載しています。`, grid => {
      const items = showAll ? TARGETS : TARGETS.slice(0, 9);
      items.forEach(goal => {
        const unlocked = state.save.unlocked.includes(goal.id);
        const item = document.createElement("article");
        item.className = `atlas-item${unlocked ? "" : " locked"}`;
        const art = document.createElement("div"); art.className = "atlas-art"; art.textContent = unlocked ? goal.icon : "◌";
        const status = document.createElement("span"); status.className = "atlas-state"; status.textContent = unlocked ? "✦ 解放" : "🔒 未到達";
        const title = document.createElement("h3"); title.textContent = unlocked ? goal.name : "？？？";
        const distance = document.createElement("p"); distance.className = "atlas-distance"; distance.textContent = unlocked ? formatGoal(goal) : "目標を達成すると解放";
        const kind = document.createElement("p"); kind.className = "atlas-kind"; kind.textContent = unlocked ? goal.kind : "未知の天体";
        const description = document.createElement("p"); description.textContent = unlocked ? goal.description : "紙を折って、この天体を発見しよう。";
        item.append(art, status, title, distance, kind, description);
        grid.append(item);
      });
    }, [
      ...(showAll ? [] : [{ label:`全${TARGETS.length}目標をみる`, primary:true, run:() => openAtlas(true) }]),
      { label:"閉じる", run:closeModal }
    ]);
  }

  function openRecords() {
    const list = [...state.save.clears].reverse();
    openModal(state.save.unlocked.includes("observable-universe") ? "宇宙の果てに到達！" : "これまでの記録", "YOUR COSMIC JOURNEY", state.save.unlocked.includes("observable-universe") ? "あなたは紙の厚さで、観測可能な宇宙の半径を超えました。壮大な挑戦の記録です。" : "ここまでの宇宙の旅を振り返ろう。", grid => {
      const summary = document.createElement("article");
      summary.className = "atlas-item";
      const summaryArt = document.createElement("div"); summaryArt.className = "atlas-art"; summaryArt.textContent = "🏅";
      const summaryTitle = document.createElement("h3"); summaryTitle.textContent = "今回の記録";
      const summaryDistance = document.createElement("p"); summaryDistance.className = "atlas-distance"; summaryDistance.textContent = `${state.folds.toLocaleString("ja-JP")} 回折り · ${formatThickness()}`;
      const summaryGoals = document.createElement("p"); summaryGoals.textContent = `${state.save.unlocked.length} 個の目標を達成`;
      summary.append(summaryArt, summaryTitle, summaryDistance, summaryGoals);
      grid.append(summary);
      if (list.length) list.forEach((record, index) => {
        const item = document.createElement("article"); item.className = "atlas-item";
        const art = document.createElement("div"); art.className = "atlas-art"; art.textContent = index === 0 ? "🌌" : "✨";
        const title = document.createElement("h3"); title.textContent = `クリア記録 · ${record.date}`;
        const distance = document.createElement("p"); distance.className = "atlas-distance"; distance.textContent = `${record.folds} 回 · ${record.thickness}`;
        item.append(art, title, distance); grid.append(item);
      });
    }, [
      { label:"もう一度挑戦する", primary:true, run:() => { closeModal(); resetGame(false); } },
      { label:"閉じる", run:() => { closeModal(); state.busy = false; } }
    ]);
  }

  function openSettings() {
    openModal("設定", "GAME SETTINGS", "効果音の設定や、保存した記録のリセットができます。", grid => {
      const description = document.createElement("p");
      description.className = "settings-note";
      description.textContent = "記録をリセットすると、今回の進行・達成済み目標・最高記録・クリア記録がすべて削除されます。";
      grid.append(description);
    }, [
      { label:"すべての記録をリセット", run:() => resetGame(true) },
      { label:"閉じる", primary:true, run:closeModal }
    ]);
  }

  function closeModal() { $("modal-overlay").hidden = true; }
  function shareMessage() {
    return `${state.shareText || "紙を折って宇宙を目指しています。"}`;
  }
  function shareUrl() {
    return /^https?:$/.test(location.protocol) ? location.origin + location.pathname : "";
  }
  function openShareWindow(url) {
    const win = window.open(url, "_blank", "noopener,noreferrer,width=600,height=640");
    if (!win) showToast("ポップアップがブロックされました。許可してもう一度お試しください。");
  }
  async function copyShareText() {
    const text = [shareMessage(), "#JustFolding", shareUrl()].filter(Boolean).join(" ");
    try {
      await navigator.clipboard.writeText(text);
      showToast("シェア用の文章をコピーしました。");
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;opacity:0";
      document.body.append(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch {}
      area.remove();
      showToast(ok ? "シェア用の文章をコピーしました。" : "コピーできませんでした。");
    }
  }
  async function nativeShare() {
    try {
      const data = { title:"Just Folding", text:`${shareMessage()} #JustFolding` };
      if (shareUrl()) data.url = shareUrl();
      await navigator.share(data);
    } catch (error) {
      if (error && error.name !== "AbortError") showToast("共有できませんでした。");
    }
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }
  function resetCurrentRun() {
    state.folds = 0;
    state.xFolds = 0;
    state.yFolds = 0;
    state.save.currentFolds = 0;
    state.save.currentXFolds = 0;
    state.save.currentYFolds = 0;
    state.crease = null;
    state.point = null;
    render();
    saveGame();
  }
  function resetGame(confirm = true) {
    if (confirm && !window.confirm("今回の進行状況と、保存済みの目標・記録をすべてリセットします。よろしいですか？")) return;
    if (confirm) state.save = { ...DEFAULT_SAVE, unlocked:[], clears:[] };
    else state.save = { ...state.save, unlocked:[] };
    state.folds = 0;
    state.xFolds = 0;
    state.yFolds = 0;
    state.completed = false;
    state.save.currentFolds = 0;
    state.save.currentXFolds = 0;
    state.save.currentYFolds = 0;
    state.axis = "x";
    state.busy = false;
    state.eventQueue = [];
    $("modal-overlay").hidden = true;
    $("event-overlay").hidden = true;
    selectAxis("x");
    render();
    saveGame();
    showToast("新しい旅をはじめました。");
  }

  $("horizontal-fold").addEventListener("click", () => selectAxis("x"));
  $("vertical-fold").addEventListener("click", () => selectAxis("y"));
  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointermove", pointerMove);
  canvas.addEventListener("pointerup", pointerUp);
  canvas.addEventListener("pointercancel", pointerCancel);
  canvas.addEventListener("lostpointercapture", pointerCancel);
  $("sound-button").addEventListener("click", () => {
    state.save.sound = !state.save.sound;
    $("sound-button").textContent = state.save.sound ? "🔊" : "🔇";
    $("sound-button").setAttribute("aria-label", state.save.sound ? "効果音をオフにする" : "効果音をオンにする");
    saveGame();
    if (state.save.sound) playTone(660, .12);
    showToast(state.save.sound ? "効果音をオンにしました。" : "効果音をオフにしました。");
  });
  $("settings-button").addEventListener("click", openSettings);
  $("open-atlas").addEventListener("click", () => openAtlas(false));
  $("show-all-goals").addEventListener("click", () => openAtlas(true));
  $("reset-button").addEventListener("click", () => resetGame(true));
  $("clear-settings-button").addEventListener("click", openSettings);
  $("skip-event").addEventListener("click", continueEvent);
  $("continue-button").addEventListener("click", continueEvent);
  $("clear-retry-button").addEventListener("click", () => resetGame(false));
  $("share-x").addEventListener("click", () => {
    const params = new URLSearchParams({ text:shareMessage(), hashtags:"JustFolding" });
    if (shareUrl()) params.set("url", shareUrl());
    openShareWindow(`https://twitter.com/intent/tweet?${params}`);
  });
  $("share-line").addEventListener("click", () => {
    const text = `${shareMessage()} #JustFolding`;
    const url = shareUrl();
    openShareWindow(url
      ? `https://social-plugins.line.me/lineit/share?${new URLSearchParams({ url, text })}`
      : `https://line.me/R/share?text=${encodeURIComponent(text)}`);
  });
  $("share-copy").addEventListener("click", copyShareText);
  if (navigator.share) {
    $("share-native").hidden = false;
    $("share-native").addEventListener("click", nativeShare);
  }
  $("close-modal").addEventListener("click", closeModal);
  $("event-overlay").addEventListener("click", event => { if (event.target === $("event-backdrop")) continueEvent(); });
  $("modal-overlay").addEventListener("click", event => { if (event.target === $("modal-overlay")) closeModal(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (!$("event-overlay").hidden) continueEvent();
      else if (!$("modal-overlay").hidden) closeModal();
    }
  });
  new ResizeObserver(resizeCanvas).observe($("paper-stage"));
  if (!state.save.sound) {
    $("sound-button").textContent = "🔇";
    $("sound-button").setAttribute("aria-label", "効果音をオンにする");
  }
  render();
  resizeCanvas();
  if (loadError) showToast("保存データを読み込めませんでした。新しい記録で開始します。");
})();
