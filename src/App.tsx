import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Database, BookOpen, ArrowRight, Sparkles, Trash2 } from 'lucide-react';

const playDynamicSound = (type: 'success' | 'error' | 'pop' | 'magic') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'pop') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'magic') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {}
};

const SPEAK = (text: string) => {
  if (text.includes("错") || text.includes("不对") || text.includes("不能切")) {
    playDynamicSound('error');
  } else if (text.includes("清理") || text.includes("销毁")) {
    playDynamicSound('pop');
  } else {
    playDynamicSound('success');
  }
};

const CrossLabel = ({ it, yuwen }: { it: string, yuwen: string }) => (
  <div className="flex items-center space-x-2 bg-slate-900/60 p-2 rounded-lg border border-indigo-500/50 shadow-lg backdrop-blur-sm self-center my-2 w-fit">
    <span className="flex items-center text-cyan-400 text-xs sm:text-sm font-bold"><Database size={14} className="mr-1" />IT: {it}</span>
    <span className="text-slate-400 text-xs">|</span>
    <span className="flex items-center text-amber-400 text-xs sm:text-sm font-bold"><BookOpen size={14} className="mr-1" />语文: {yuwen}</span>
  </div>
);

const npcText = [
  "我们西天取经，谁才是最闪耀的C位？用数据来说话！",
  "请在图里点击你认为的‘第一主角’！",
  "准备好接收跨学科的神奇法则了吗？",
  "考考你！怎么才能在词云图里抢占最大的地盘？",
  "这么神奇的图，是怎么从一段普通的文字变出来的？一起进入词云加工坊吧！",
  "欢迎来到词云加工坊。跟着流水线，体验数据清洗的魔力！",
  "注意甄别！垃圾数据会污染我们的结果哦！",
  "最后一步！看图猜故事，这才是跨学科数据小侦探的真本事！"
];

const Step2 = ({ next }: { next: () => void, key?: string }) => {
  const [monkeyVotes, setMonkeyVotes] = useState(0);
  const [monkVotes, setMonkVotes] = useState(0);
  const [shake, setShake] = useState(false);

  const handleVote = (char: 'monkey' | 'monk') => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    if (char === 'monkey') {
      setMonkeyVotes(v => v + 1);
      SPEAK("俺老孙降妖除魔，当然是主角！");
    } else {
      setMonkVotes(v => v + 1);
      SPEAK("阿弥陀佛，贫僧乃金蝉子转世。");
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center w-full h-full text-center space-y-8 py-8" 
      initial={{ scale: 0.8, opacity: 0 }} 
      animate={{ x: shake ? [0, -10, 10, -10, 10, 0] : 0, scale: 1, opacity: 1 }} 
      exit={{ scale: 1.2, opacity: 0 }}
      transition={shake ? { duration: 0.4 } : {}}
    >
      <h1 className="text-4xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-red-500 drop-shadow-md">24课 抽取文本汇词云</h1>
      <div className="flex space-x-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleVote('monkey')} className="relative w-40 h-56 bg-slate-800/80 rounded-2xl border-2 border-amber-500 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_20px_#f59e0b]">
          <span className="text-6xl drop-shadow-[0_0_10px_#fff]">🐒</span>
          <h2 className="mt-4 font-bold text-xl text-amber-300">孙悟空</h2>
          <AnimatePresence>
            {monkeyVotes > 0 && <motion.div key="monkeyVotes" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm">+{monkeyVotes} 票</motion.div>}
          </AnimatePresence>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleVote('monk')} className="relative w-40 h-56 bg-slate-800/80 rounded-2xl border-2 border-slate-400 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_20px_#94a3b8]">
          <span className="text-6xl drop-shadow-[0_0_10px_#fff]">👨‍🦲</span>
          <h2 className="mt-4 font-bold text-xl text-slate-300">唐僧</h2>
          <AnimatePresence>
            {monkVotes > 0 && <motion.div key="monkVotes" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 bg-blue-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm">+{monkVotes} 票</motion.div>}
          </AnimatePresence>
        </motion.div>
      </div>
      <button onClick={next} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold shadow-[0_0_20px_#0ea5e9] hover:shadow-[0_0_30px_#38bdf8] transition-all flex items-center text-lg text-white">
        开启探究之旅 <ArrowRight className="ml-2" />
      </button>
    </motion.div>
  );
};

const Step1 = ({ next }: { next: () => void, key?: string }) => {
  const [showCloud, setShowCloud] = useState(false);
  const textExcerpt = "唐僧师徒四人来到宛子山。一天，唐僧感到饥饿，孙悟空便去化斋。山上有一个白骨精，她听说吃了唐僧肉可以长生不老，便动了邪念。白骨精先变作一个美丽的村姑，提着香米饭和炒面筋左拐右拐来诱骗唐僧。孙悟空化斋回来，立刻用火眼金睛识破了妖怪，一棒打死。但妖怪狡猾，留下一具假尸体，真身化作青烟逃走。后来，白骨精又变作寻找女儿的老妇人，拄着拐杖哭哭啼啼走来，再次被孙悟空识破并一棒打死。最后，白骨精变作一个白发老翁，摸索着假装寻找妻女。孙悟空忍无可忍，叫来土地神和山神在空中作证，第三次将其打死，终于让妖怪显了原形——一堆上面刻着“白骨夫人”的白骨。但唐僧肉眼凡胎，不仅不相信孙悟空，反而认为他连杀三人，残杀无辜、屡教不改。在猪八戒的在一旁添油加醋的挑拨下，唐僧大怒，念起紧箍咒疼得悟空满地打滚，最后狠心写下贬书，将孙悟空无情地驱逐回花果山水帘洞。";

  return (
    <motion.div className="flex flex-col items-center w-full h-full justify-center space-y-6 md:space-y-8" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
       <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-6 px-4">
         
         {/* Left Side: Text Excerpt */}
         <div className="relative flex-1 w-full border-2 border-slate-600/60 rounded-3xl bg-slate-800/60 p-5 md:p-8 shadow-[inset_0_0_30px_#0f172a] backdrop-blur-md flex flex-col">
            <h3 className="text-xl md:text-2xl text-amber-300 font-bold mb-4 border-b border-slate-600/50 pb-3 flex items-center">
              <BookOpen className="mr-3 text-amber-400" size={24}/> 名著片段节选
            </h3>
             <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify indent-8 tracking-wide">
               {textExcerpt}
             </p>
         </div>

         {/* Right Side Logic */}
         {!showCloud ? (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex-1 w-full min-h-[300px] flex flex-col items-center justify-center space-y-8 px-6 md:px-12 border-2 border-dashed border-indigo-500/30 rounded-3xl bg-slate-800/30">
               <p className="text-xl md:text-2xl text-indigo-200 font-medium text-center leading-relaxed">思考问题：<br/><span className="text-white">快速浏览，片段中出现了哪些人物？</span></p>
               <button onClick={() => { setShowCloud(true); playDynamicSound('magic'); }} className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full font-bold text-xl md:text-2xl text-white shadow-[0_0_40px_rgba(192,38,211,0.6)] hover:scale-105 transition-all w-full md:w-auto">
                 神奇工具
               </button>
            </motion.div>
         ) : (
           <>
             {/* PK separator */}
             <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 12 }} className="flex-shrink-0 z-20 self-center -my-6 md:-mx-8 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                   <span className="font-black text-2xl md:text-4xl text-white italic drop-shadow-md">PK</span>
                </div>
             </motion.div>

             {/* Right Side: Word Cloud */}
             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="relative flex-1 w-full min-h-[300px] border-2 border-indigo-500/50 rounded-3xl flex items-center justify-center bg-[#071120] shadow-[inset_0_0_40px_#3b0764] overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent" />
                
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  onClick={() => { playDynamicSound('magic'); next(); }}
                  className="cursor-pointer font-black text-amber-500 z-10 absolute transition-all"
                  style={{ fontSize: '4rem', left: '15%', top: '25%', textShadow: '0 0 20px rgba(245,158,11,0.5)' }}
                >
                   孙悟空
                </motion.div>
                
                <div className="text-indigo-400 absolute font-bold drop-shadow-md z-10" style={{ fontSize: '2.8rem', right: '12%', top: '15%' }}>白骨精</div>
                <div className="text-red-400 absolute font-bold" style={{ fontSize: '2.4rem', left: '8%', bottom: '20%' }}>唐僧</div>
                <div className="text-cyan-300 absolute font-bold" style={{ fontSize: '2rem', right: '10%', bottom: '25%' }}>猪八戒</div>
                <div className="text-emerald-300 absolute font-bold" style={{ fontSize: '1.8rem', right: '35%', top: '10%' }}>紧箍咒</div>
                <div className="text-orange-500 absolute font-bold" style={{ fontSize: '1.8rem', left: '38%', bottom: '15%' }}>金箍棒</div>
                
                <div className="text-purple-300 absolute font-medium" style={{ fontSize: '1.4rem', left: '5%', top: '10%' }}>村姑</div>
                <div className="text-pink-300 absolute font-medium" style={{ fontSize: '1.4rem', right: '5%', top: '45%' }}>老妇人</div>
                <div className="text-teal-200 absolute font-medium" style={{ fontSize: '1.2rem', left: '25%', top: '15%' }}>老翁</div>
                <div className="text-indigo-200 absolute font-medium" style={{ fontSize: '1.4rem', right: '30%', bottom: '30%' }}>吃人</div>
                <div className="text-blue-300 absolute font-medium tracking-widest" style={{ fontSize: '1.1rem', left: '5%', bottom: '45%' }}>肉眼凡胎</div>
                <div className="text-yellow-300 absolute font-bold" style={{ fontSize: '1.6rem', right: '5%', bottom: '10%' }}>火眼金睛</div>
                <div className="text-rose-300 absolute font-medium" style={{ fontSize: '1.2rem', left: '30%', bottom: '35%' }}>化斋</div>
                <div className="text-sky-300 absolute font-medium" style={{ fontSize: '1.2rem', right: '45%', top: '35%' }}>驱逐</div>
                <div className="text-fuchsia-300 absolute font-medium" style={{ fontSize: '1.2rem', left: '42%', top: '48%' }}>沙僧</div>
                <div className="text-lime-300 absolute font-medium" style={{ fontSize: '1.5rem', left: '35%', top: '65%' }}>妖精</div>
                <div className="text-purple-400 absolute font-medium" style={{ fontSize: '1.2rem', right: '25%', top: '65%' }}>宛子山</div>
                <div className="text-red-200 absolute font-medium" style={{ fontSize: '1.1rem', right: '15%', bottom: '50%' }}>打死</div>
             </motion.div>
           </>
         )}

       </div>

       <div className="h-48 w-full flex items-center justify-center">
         <AnimatePresence>
           {showCloud && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-200 font-medium text-lg">请点击词云中最大的词！</motion.div>
           )}
         </AnimatePresence>
       </div>
    </motion.div>
  );
};

const Step5 = ({ next }: { next: () => void, key?: string }) => (
  <div className="flex flex-col justify-center items-center h-full w-full max-w-3xl mx-auto py-8">
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', duration: 1 }} className="text-8xl mb-8 drop-shadow-[0_0_20px_#fff]">
        👨‍🦲
      </motion.div>
      <motion.div className="flex flex-col items-center">
        <motion.p 
          initial={{ width: 0 }} animate={{ width: '100%' }} 
          className="text-2xl md:text-3xl font-mono overflow-hidden whitespace-nowrap border-r-4 pr-2 border-transparent text-amber-300 font-bold mb-4"
          transition={{ duration: 1.5, ease: "linear" }}
        >
          这么神奇的图，是怎么变出来的？
        </motion.p>
        <motion.p 
          initial={{ width: 0 }} animate={{ width: '100%' }} 
          className="text-2xl md:text-3xl font-mono overflow-hidden whitespace-nowrap border-r-4 pr-2 border-cyan-400 text-amber-300 font-bold"
          transition={{ duration: 1.5, ease: "linear", delay: 1.5 }}
        >
          一起进入词云加工坊吧！
        </motion.p>
      </motion.div>
      <motion.button initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, type: "spring" }} onClick={next} className="mt-12 px-10 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full font-bold text-2xl text-white shadow-[0_0_30px_#c026d3] hover:scale-105 transition-transform">
        进入全自动加工坊 <Sparkles className="inline ml-2" />
      </motion.button>
  </div>
);

const StepWorkflowIntro = ({ next }: { next: () => void, key?: string }) => {
  const steps = [
    { q: "文字还在外面，第一步要先做什么", a: "（导入文本）" },
    { q: "进了文本之后，电脑要知道我们在说什么，得先把句子怎么样？", a: "（分词）" },
    { q: "分完词，有些词像‘的、了、是’对我们帮助不大，要怎么办？", a: "（去废词）" },
    { q: "接下来，电脑怎么知道哪个词更重要？", a: "（算词频）" },
    { q: "如果遇到‘呆子’和‘猪八戒’，要不要区分那么细？", a: "（合并同义词）" },
    { q: "最后一步", a: "重点一目了然的词云图诞生啦！" }
  ];
  const [revealed, setRevealed] = useState<boolean[]>(Array(6).fill(false));

  const toggleReveal = (index: number) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
       <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 drop-shadow-lg tracking-wider">词云图诞生六步</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full px-4 mb-6">
         {steps.map((step, i) => (
           <motion.div 
             key={i} 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ delay: i * 0.15, type: 'spring' }}
             onClick={() => toggleReveal(i)}
             className={`relative border-2 rounded-2xl p-6 flex flex-col items-start cursor-pointer transition-all min-h-[140px]
               ${revealed[i] ? 'bg-indigo-900/60 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-slate-800/80 border-indigo-500/50 shadow-md hover:bg-slate-700/80'}
             `}
           >
             <div className="flex items-start space-x-3 mb-2 w-full">
               <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shadow-inner text-white ${revealed[i] ? 'bg-cyan-600' : 'bg-indigo-600'}`}>
                 {i + 1}
               </div>
               <p className="text-lg md:text-xl font-bold text-slate-200 text-left leading-normal flex-1">
                 {step.q}
               </p>
             </div>
             
             <div className="flex-1 w-full flex flex-col justify-end">
               <AnimatePresence>
                 {revealed[i] && (
                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 text-cyan-300 font-extrabold text-2xl tracking-wide w-full overflow-hidden text-center bg-cyan-900/40 rounded-lg py-2 border border-cyan-500/30">
                     {step.a}
                   </motion.div>
                 )}
               </AnimatePresence>
  
               {!revealed[i] && (
                 <p className="text-slate-400 text-sm mt-4 font-medium bg-black/30 px-3 py-1.5 rounded-full w-max mx-auto shadow-inner transition-colors group-hover:text-slate-300">
                    点击查看答案
                 </p>
               )}
             </div>
           </motion.div>
         ))}
       </div>
       <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={next} className="mt-4 px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-black text-2xl text-white shadow-[0_0_30px_#22d3ee] hover:scale-105 hover:shadow-[0_0_40px_#22d3ee] transition-all flex items-center z-10 active:scale-95 border border-cyan-400/50">
         开始体验流水线 <ArrowRight className="inline ml-2" size={28} />
       </motion.button>
    </div>
  );
};

const Step6 = ({ next }: { next: () => void, key?: string }) => {
  const [sub, setSub] = useState(0);
  const [trashWords, setTrashWords] = useState([false, false]); 
  const [sliderVal, setSliderVal] = useState(3);
  const [merged, setMerged] = useState(false);

  const chars = "沙僧挑担嘿呦呦后面来了白龙马".split("");
  const validCuts = [1, 3, 6, 8, 10];
  const [activeCuts, setActiveCuts] = useState<number[]>([]);
  const [shakeStep6, setShakeStep6] = useState(false);

  const advance = () => setSub(s => s + 1);

  const handleCut = (index: number) => {
    if (activeCuts.includes(index)) return;
    if (validCuts.includes(index)) {
      setActiveCuts(prev => [...prev, index]);
      SPEAK("切分成功！");
    } else {
      setShakeStep6(true);
      setTimeout(() => setShakeStep6(false), 400);
      SPEAK("这里不能切哦，词汇会被切碎的！");
    }
  };

  const sortedCuts = [...activeCuts].sort((a,b) => a-b);
  const groups = [];
  let start = 0;
  for (const cutIndex of sortedCuts) {
    groups.push({ start, end: cutIndex });
    start = cutIndex + 1;
  }
  groups.push({ start, end: chars.length - 1 });

  return (
    <div className="flex flex-col items-center w-full h-full space-y-4 relative">
       {/* 进度条：微型流水线 */}
       <div className="flex space-x-2 text-sm md:text-base font-mono text-slate-400 mb-2 bg-slate-900/80 p-3 rounded-2xl border border-indigo-500/30 backdrop-blur-sm w-full overflow-x-auto justify-center hide-scrollbar">
         {['导入','分词','去废词','算词频','合并同义词','生成词云'].map((l, idx) => {
           const i = idx;
           return (
             <span key={l} className={`${sub === i ? 'text-cyan-400 font-bold drop-shadow-[0_0_5px_#22d3ee]' : ''} ${sub > i ? 'text-green-400' : ''}`}>
               {l} {idx < 5 && <span className="text-slate-600 mx-2">{idx >= 3 ? '→' : '—'}</span>}
             </span>
           );
         })}
       </div>

       <AnimatePresence mode="wait">
         {sub === 0 && (
           <motion.div key="s0" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center flex-1 justify-center w-full">
              <h3 className="text-3xl mb-8 font-bold text-cyan-300">1. 导入原始数据</h3>
              <div className="p-8 bg-slate-800/80 rounded-2xl text-[1.4rem] md:text-3xl border border-slate-600 shadow-xl font-medium tracking-wide text-center leading-relaxed">
                沙僧挑担嘿呦呦<br/>后面来了白龙马
              </div>
              <button onClick={advance} className="mt-10 px-8 py-3 bg-cyan-600 rounded-full text-xl font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]">启动流水线</button>
           </motion.div>
         )}

         {sub === 1 && (
           <motion.div key="s1" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center w-full flex-1 justify-center">
              <h3 className="text-xl md:text-3xl font-bold text-cyan-300">2. 分词切割</h3>
              <CrossLabel it="分词技术 (Tokenization)" yuwen="词语划分" />
              <p className="mb-6 text-indigo-200">计算机读不懂长句！<span className="text-amber-400 font-bold">请点击文字缝隙之间的虚线，切开它们！</span></p>
              
              <motion.div 
                className="flex flex-wrap items-center justify-center p-6 bg-slate-800/80 rounded-3xl border border-slate-600 shadow-lg select-none"
                animate={{ x: shakeStep6 ? [0, -10, 10, -10, 10, 0] : 0 }} 
                transition={shakeStep6 ? { duration: 0.4 } : {}}
              >
                {groups.map((g, gIdx) => (
                  <React.Fragment key={gIdx}>
                    <div className="flex flex-wrap justify-center items-center bg-slate-700 px-2 rounded-lg py-1 mb-2">
                      {Array.from({length: g.end - g.start + 1}).map((_, i) => {
                        const charIndex = g.start + i;
                        return (
                          <React.Fragment key={charIndex}>
                            <span className="py-2 text-2xl md:text-3xl font-bold tracking-widest leading-none flex items-center">{chars[charIndex]}</span>
                            {charIndex < g.end && (
                               <div 
                                 onClick={() => handleCut(charIndex)}
                                 className="w-4 md:w-6 h-8 mx-1 cursor-pointer bg-slate-600/30 hover:bg-red-400/50 rounded border border-transparent hover:border-red-400 border-dashed transition-all"
                               />
                            )}
                            {(charIndex === 6) && g.end > charIndex && (
                               <div className="basis-full h-2"></div>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </div>
                    {gIdx < groups.length - 1 && (
                       <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className={`w-1.5 h-12 bg-amber-400 shadow-[0_0_15px_#facc15] mx-2 rounded-full mb-2 ${(groups[gIdx].end === 6) ? 'basis-full h-0 shadow-none mx-0 mb-4 bg-transparent' : ''}`} />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

              <div className="mt-8 h-12">
                {activeCuts.length >= validCuts.length && (
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={advance} className="px-6 py-3 bg-amber-500 text-black font-black rounded-full shadow-[0_0_20px_#f59e0b]">干得漂亮！进入下一步</motion.button>
                )}
              </div>
           </motion.div>
         )}

         {sub === 2 && (
           <motion.div key="s2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center w-full flex-1 relative">
              <h3 className="text-xl md:text-3xl font-bold text-cyan-300">3. 清除废词</h3>
              <CrossLabel it="去除停用词 (Filtering)" yuwen="剔除无意义虚词" />
              <p className="mb-6 text-indigo-200">如果不管它们，虚词就会霸占主角位置！<span className="text-amber-400 font-bold">请将橘色虚词拖进黑洞销毁！</span></p>
              
              <div className="flex flex-wrap space-x-4 mb-auto mt-4 justify-center items-center h-32 w-full p-4">
                 <span className="bg-slate-700 p-4 rounded-xl text-2xl shadow-md border border-slate-500">沙僧</span>
                 
                 <AnimatePresence>
                   {!trashWords[0] && (
                     <motion.div drag dragConstraints={{ top: -100, bottom: 300, left: -400, right: 400 }} dragElastic={0.5} whileDrag={{ scale: 1.2, zIndex: 100 }}
                       onDragEnd={(e, info) => { if (info.offset.y > 150) { setTrashWords(t=>{t[0]=true; return [...t]}); SPEAK("清理完毕！"); } }} 
                       className="bg-orange-500 cursor-grab p-4 rounded-xl text-2xl font-bold text-white shadow-[0_0_15px_#f97316] z-10">嘿呦呦</motion.div>
                   )}
                 </AnimatePresence>

                 <span className="bg-slate-700 p-4 rounded-xl text-2xl shadow-md border border-slate-500">后面</span>
                 <span className="bg-slate-700 p-4 rounded-xl text-2xl shadow-md border border-slate-500">白龙马</span>
                 
                 <AnimatePresence>
                   {!trashWords[1] && (
                     <motion.div drag dragConstraints={{ top: -100, bottom: 300, left: -400, right: 400 }} dragElastic={0.5} whileDrag={{ scale: 1.2, zIndex: 100 }}
                       onDragEnd={(e, info) => { if (info.offset.y > 150) { setTrashWords(t=>{t[1]=true; return [...t]}); SPEAK("完美销毁！"); } }} 
                       className="bg-orange-500 cursor-grab p-4 rounded-xl text-2xl font-bold text-white shadow-[0_0_15px_#f97316] z-10">来了</motion.div>
                   )}
                 </AnimatePresence>
              </div>
              
              <div className="w-40 h-40 mt-12 rounded-full bg-black border-4 border-purple-500 shadow-[0_0_40px_#9333ea] flex flex-col items-center justify-center relative z-0 overflow-hidden">
                 <Trash2 className="text-purple-400 mb-1" size={40}/>
                 <span className="font-bold text-purple-300 text-lg tracking-widest">黑洞销毁区</span>
                 <div className="absolute inset-0 bg-purple-900/30 mix-blend-screen animate-pulse" />
              </div>

              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-50">
                {trashWords[0] && trashWords[1] && (
                   <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={advance} className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-full shadow-[0_0_20px_#06b6d4]">数据真干净！下一步</motion.button>
                )}
              </div>
           </motion.div>
         )}

         {sub === 3 && (
           <motion.div key="s3" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center w-full flex-1 justify-center">
              <h3 className="text-xl md:text-3xl font-bold text-cyan-300">4. 算词频</h3>
              <CrossLabel it="词频影响字号 (Frequency)" yuwen="中心人物占比" />
              <p className="mb-8 text-indigo-200">请向右拉动下方滑块，<span className="text-amber-400 font-bold">观察词频是如何像魔术一样控制字体的！</span></p>
              
              <div className="h-64 flex items-center justify-center w-full bg-slate-900/50 rounded-3xl border border-indigo-500/30 overflow-hidden relative">
                <motion.div 
                  animate={{ fontSize: `${sliderVal}rem` }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  className="font-black text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] whitespace-nowrap"
                >
                  白龙马
                </motion.div>
              </div>
              
              <div className="w-full max-w-sm mt-8 space-y-4">
                 <input type="range" min="1" max="10" step="1" value={sliderVal} onChange={(e) => setSliderVal(Number(e.target.value))} className="w-full h-4 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 flex items-center" />
                 <div className="text-center font-mono text-2xl font-bold bg-slate-800 py-2 rounded-lg border border-slate-600">
                    目前词频: <span className={sliderVal > 7 ? 'text-amber-400' : 'text-white'}>{sliderVal}</span> 次
                 </div>
              </div>
              
              <div className="mt-8 h-12">
                {sliderVal > 7 && (
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={advance} className="px-6 py-3 bg-cyan-600 rounded-full font-bold shadow-[0_0_20px_#0891b2]">够大了！前往最后一步</motion.button>
                )}
              </div>
           </motion.div>
         )}

         {sub === 4 && (
           <motion.div key="s4" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center w-full flex-1">
              <h3 className="text-xl md:text-3xl font-bold text-cyan-300">5. 合并同义词</h3>
              <CrossLabel it="数据合并 (Merging)" yuwen="同义词指代" />
              <p className="mb-12 text-indigo-200">“白龙马”和“小白龙”其实是同一个人！<span className="text-amber-400 font-bold">请把右边的紫色卡片拖进左边的主体合并！</span></p>
              
              <div className="flex flex-col md:flex-row items-center w-full justify-center md:space-x-16 space-y-8 md:space-y-0 h-64 relative">
                 
                 <motion.div animate={{ scale: merged ? [1, 1.2, 1] : 1 }} className={`w-48 h-48 rounded-full border-4 ${merged ? 'border-amber-400 shadow-[0_0_50px_#f59e0b]' : 'border-dashed border-cyan-400'} flex flex-col justify-center items-center text-cyan-300 transition-all relative z-0`}>
                   <span className="font-black" style={{ fontSize: merged ? '3.5rem' : '2.5rem' }}>白龙马</span>
                   <span className="text-sm font-normal bg-slate-800/80 px-2 py-1 rounded absolute bottom-4 border border-slate-600">总词频: <span className="font-bold text-amber-400 text-lg">{merged ? 10 : 8}</span></span>
                 </motion.div>
                 
                 <AnimatePresence>
                   {!merged && (
                     <motion.div 
                       drag 
                       dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
                       dragElastic={0.5}
                       whileDrag={{ scale: 1.1, zIndex: 50 }}
                       onDragEnd={(e, info) => { 
                         if (info.offset.x < -40 || info.point.x < window.innerWidth/2) { 
                           setMerged(true); 
                           SPEAK("合并成功！主角地位不可撼动！"); 
                         } 
                       }}
                       className="bg-fuchsia-600/90 border-2 border-fuchsia-400 p-6 rounded-2xl cursor-grab text-3xl font-bold flex flex-col items-center shadow-[0_0_20px_#c026d3] z-10 w-40"
                     >
                       小白龙
                       <span className="text-sm font-normal mt-2 border-t border-fuchsia-400 pt-2 w-full text-center">词频: 2</span>
                     </motion.div>
                   )}
                 </AnimatePresence>

              </div>
              
              <div className="mt-8 h-16">
                {merged && (
                  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={advance} className="px-10 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full font-black text-xl shadow-[0_0_30px_#f59e0b] hover:scale-105">启动炫酷生成！</motion.button>
                )}
              </div>
           </motion.div>
         )}

         {sub === 5 && (
           <motion.div key="s5" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center w-full flex-1 py-8">
              <h3 className="text-4xl mb-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400 flex items-center drop-shadow-md"><Sparkles className="mr-3 text-fuchsia-400" size={40}/>最终词云图呈现</h3>
              
              <div className="relative w-full max-w-xl h-80 border-2 border-indigo-500/50 rounded-3xl flex items-center justify-center bg-[#071120] shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
                 
                 <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.2 }} className="font-black text-amber-500 absolute cursor-pointer hover:scale-110 transition-transform" style={{ fontSize: '8rem', textShadow: '0 0 30px #f59e0b', zIndex: 10 }}>白龙马</motion.div>
                 
                 <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.6 }} className="text-cyan-300 absolute font-bold hover:scale-110 transition-transform" style={{ fontSize: '2.5rem', right: '10%', top: '20%' }}>沙僧</motion.div>
                 
                 <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.8 }} className="text-purple-400 absolute font-bold hover:scale-110 transition-transform" style={{ fontSize: '1.2rem', left: '10%', bottom: '25%' }}>挑担</motion.div>
                 
                 <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:1.0 }} className="text-slate-400 absolute font-bold hover:scale-110 transition-transform" style={{ fontSize: '1.5rem', right: '25%', bottom: '20%' }}>后面</motion.div>
              </div>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} onClick={next} className="mt-12 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold animate-pulse text-xl text-white shadow-xl shadow-cyan-500/50">开启大挑战</motion.button>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};



const Step8 = ({ next, restart }: { next: () => void, restart?: () => void, key?: string }) => {
  const [ans, setAns] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  
  if (done) {
    return (
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center w-full h-full text-center">
         <div className="w-80 h-56 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600 rounded-2xl border-4 border-yellow-200 shadow-[0_0_80px_#f59e0b] flex flex-col items-center justify-center mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-32 w-12 animate-pulse" />
            <Sparkles className="text-white mb-4 drop-shadow-lg" size={48} />
            <h2 className="text-3xl font-black text-white drop-shadow-md tracking-wider">跨学科数据小侦探</h2>
            <p className="text-yellow-100 text-sm mt-3 font-bold bg-black/20 px-3 py-1 rounded-full">🎓 语文学科 × 信息技术</p>
         </div>
         <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-sm mb-4">恭喜你，完美通关！</h1>
         <p className="text-slate-300 mt-2 text-xl mb-8">你学会了像数据科学家一样，一秒揪出核心！</p>
         {restart && (
           <motion.button 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ delay: 0.5 }}
             onClick={restart} 
             className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full font-bold text-white shadow-lg border border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center"
           >
             返回首页重新体验
           </motion.button>
         )}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full justify-center space-y-8">
       <div className="text-center">
          <h2 className="text-3xl font-bold text-cyan-300 mb-2">见云识文：终极推理</h2>
          <p className="text-amber-300 text-lg">用“提炼中心思想”的方法，看图反推这是西游记里的什么故事？</p>
       </div>

       <div className="relative w-full max-w-lg h-64 border rounded-2xl flex justify-center items-center bg-slate-900 border-rose-500/50 shadow-[0_0_30px_#9f1239_inset] overflow-hidden select-none">
          {/* 核心角色 / 高频词汇 */}
          <div className="font-black text-rose-500 absolute drop-shadow-[0_0_15px_#e11d48] z-10" style={{ fontSize: '4.5rem' }}>红孩儿</div>
          <div className="text-amber-400 absolute font-bold drop-shadow-md z-10" style={{ fontSize: '2.5rem', right: '12%', top: '15%' }}>孙悟空</div>
          <div className="text-blue-300 absolute font-bold drop-shadow-md z-10" style={{ fontSize: '2.2rem', left: '10%', top: '10%' }}>观音菩萨</div>

          {/* 次高频词汇 */}
          <div className="text-orange-500 absolute font-bold" style={{ fontSize: '2.0rem', left: '18%', bottom: '15%' }}>三昧真火</div>
          <div className="text-red-400 absolute font-bold" style={{ fontSize: '1.8rem', right: '15%', bottom: '12%' }}>唐僧</div>
          <div className="text-stone-300 absolute font-bold" style={{ fontSize: '1.8rem', right: '35%', top: '5%' }}>牛魔王</div>

          {/* 低频词汇 (点缀) */}
          <div className="text-pink-400 absolute font-medium" style={{ fontSize: '1.4rem', left: '5%', top: '45%' }}>铁扇公主</div>
          <div className="text-emerald-300 absolute font-medium" style={{ fontSize: '1.5rem', right: '3%', top: '45%' }}>莲花台</div>
          <div className="text-yellow-500 absolute font-medium" style={{ fontSize: '1.3rem', left: '25%', top: '4%' }}>火尖枪</div>
          <div className="text-cyan-200 absolute font-medium" style={{ fontSize: '1.2rem', right: '22%', top: '6%' }}>净瓶水</div>
          <div className="text-fuchsia-300 absolute font-medium tracking-widest" style={{ fontSize: '1.1rem', left: '28%', bottom: '5%' }}>善财童子</div>
          <div className="text-yellow-300 absolute font-bold" style={{ fontSize: '1.4rem', right: '10%', bottom: '30%' }}>枯松涧</div>
          <div className="text-red-300 absolute font-medium" style={{ fontSize: '1.2rem', left: '4%', bottom: '10%' }}>火云洞</div>
          <div className="text-sky-300 absolute font-medium" style={{ fontSize: '1.1rem', right: '40%', bottom: '4%' }}>猪八戒</div>
          <div className="text-slate-300 absolute font-medium" style={{ fontSize: '1.2rem', left: '45%', top: '22%' }}>吐火烟</div>
       </div>

       <div className="flex flex-col w-full max-w-xl space-y-4">
          {['A. 孙悟空大闹天宫，被压五指山。', 'B. 牛魔王之子用烈火烧大圣，最终被菩萨收服。', 'C. 唐僧西天取经遇女儿国。'].map((txt, i) => (
             <button key={i} onClick={() => {
                if (i===1) { setAns(i); SPEAK("太厉害了！核心角色全对上了！"); setTimeout(()=>setDone(true), 2500); }
                else { setAns(i); SPEAK("剧情对不上哦，再看看词云里那些最大最显眼的名字！"); }
             }} className={`p-5 text-left border-2 rounded-xl transition-all text-xl font-bold shadow-md ${ans===i ? (i===1 ? 'bg-green-900/80 border-green-500 shadow-[0_0_20px_#22c55e]':'bg-red-900/80 border-red-500 shadow-[0_0_20px_#ef4444]') : 'bg-slate-800/80 border-slate-600 text-slate-200 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`}>
                {txt}
             </button>
          ))}
       </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(s => Math.min(s + 1, 6));

  return (
     <div className="min-h-screen w-full bg-slate-900 text-white relative font-sans flex flex-col selection:bg-cyan-500/30 overflow-x-hidden">
       
       {/* 右上角水印已移除 */}

       {/* 动态呼吸背景 */}
       <motion.div
         className="fixed inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#3b0764] to-[#0f172a]"
         animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
         transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
         style={{ backgroundSize: '200% 200%' }}
       />

       {/* 主机内容区域 */}
       <div className="relative z-10 flex flex-col flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 min-h-screen">
         
         {/* 赛博风顶部导航进度条 */}
         <div className="flex space-x-2 md:space-x-4 mb-6 md:mb-8 shrink-0">
           {[1,2,3,4,5,6].map(s => (
             <div key={s} className="flex-1 relative h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
               {step >= s && (
                 <motion.div 
                   layoutId={`progress-${s}`}
                   className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_#22d3ee]" 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                 />
               )}
             </div>
           ))}
         </div>

         {/* 核心互娱卡片区 */}
         <div className="flex-1 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-indigo-500/50 p-6 md:p-12 mb-4 flex flex-col justify-center items-center relative shadow-[0_0_40px_rgba(59,7,100,0.6)] overflow-hidden">
           
           {/* Card subtle flare effect */}
           <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
           <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-50" />

           <AnimatePresence mode="wait">
             {step === 1 && <Step1 key="s1" next={nextStep} />}
             {step === 2 && <Step2 key="s2" next={nextStep} />}
             {step === 3 && <Step5 key="s5" next={nextStep} />}
             {step === 4 && <StepWorkflowIntro key="sw" next={nextStep} />}
             {step === 5 && <Step6 key="s6" next={nextStep} />}
             {step === 6 && <Step8 key="s8" next={nextStep} restart={() => setStep(1)} />}
           </AnimatePresence>
         </div>



       </div>
     </div>
  );
}
