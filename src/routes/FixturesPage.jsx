import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaTrophy, FaFutbol, FaNewspaper, FaPlayCircle, FaClock,
  FaExternalLinkAlt, FaSyncAlt, FaChevronDown, FaChevronUp,
  FaYoutube, FaFire, FaStar, FaFilter,
} from 'react-icons/fa';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA (cloned from Bookit fixtures page)
// ═══════════════════════════════════════════════════════════════

const LEAGUE_META = {
  PL:  { name: 'Premier League',        color: 'border-purple-500', bg: 'bg-purple-700',  accent: '#a855f7', textColor: 'text-purple-400' },
  LL:  { name: 'La Liga',               color: 'border-orange-500', bg: 'bg-orange-600',  accent: '#f97316', textColor: 'text-orange-400' },
  SA:  { name: 'Serie A',               color: 'border-blue-500',   bg: 'bg-blue-600',    accent: '#3b82f6', textColor: 'text-blue-400' },
  BL:  { name: 'Bundesliga',            color: 'border-red-500',    bg: 'bg-red-600',     accent: '#ef4444', textColor: 'text-red-400' },
  PSL: { name: 'Premier Soccer League', color: 'border-yellow-500', bg: 'bg-yellow-600',  accent: '#eab308', textColor: 'text-yellow-400' },
  UCL: { name: 'Champions League',      color: 'border-blue-900',   bg: 'bg-blue-900',    accent: '#1e3a8a', textColor: 'text-blue-300' },
};

const TEAM_COLORS = {
  Arsenal:'#EF0107',Chelsea:'#034694','Manchester City':'#6CABDD',Liverpool:'#C8102E',
  Tottenham:'#132257','Manchester United':'#DA291C',Newcastle:'#241F20','Aston Villa':'#670E36',
  Brighton:'#0057B8','West Ham':'#7A263A',Everton:'#003399',Wolves:'#FDB913',
  'Crystal Palace':'#1B458F',Fulham:'#CC0000',Bournemouth:'#DA291C','Nottingham Forest':'#DD0000',
  Barcelona:'#A50044','Real Madrid':'#FEBE10','Atletico Madrid':'#CB3524',Sevilla:'#D60B2C',
  'Real Sociedad':'#143C8C',Villarreal:'#FFE600','Real Betis':'#00954C','Athletic Bilbao':'#EE2523',
  'Inter Milan':'#009BDB','AC Milan':'#FB090B',Juventus:'#000000',Napoli:'#12A0D7',
  Roma:'#8E1F2F',Atalanta:'#1E71B8',Lazio:'#87D8F7',Fiorentina:'#482E92',
  'Bayern Munich':'#DC052D','Borussia Dortmund':'#FDE100','RB Leipzig':'#DD0741','Bayer Leverkusen':'#E32221',
  'Eintracht Frankfurt':'#E1000F',Wolfsburg:'#65B32E',Stuttgart:'#E32219',Freiburg:'#D3080C',
  'Kaizer Chiefs':'#FDB913','Orlando Pirates':'#000000','Mamelodi Sundowns':'#FFD700',
  'SuperSport United':'#004B93','Cape Town City':'#00BFFF',Stellenbosch:'#8B0000',
  AmaZulu:'#228B22','Sekhukhune United':'#800020','Golden Arrows':'#FFD700','Richards Bay':'#005B5C',
};

const TEAM_LOGOS = {
  Arsenal:'https://crests.football-data.org/57.png',Chelsea:'https://crests.football-data.org/61.png',
  'Manchester City':'https://crests.football-data.org/65.png',Liverpool:'https://crests.football-data.org/64.png',
  Tottenham:'https://crests.football-data.org/73.png','Manchester United':'https://crests.football-data.org/66.png',
  Newcastle:'https://crests.football-data.org/67.png','Aston Villa':'https://crests.football-data.org/58.png',
  Brighton:'https://crests.football-data.org/397.png','West Ham':'https://crests.football-data.org/563.png',
  Everton:'https://crests.football-data.org/62.png',Wolves:'https://crests.football-data.org/76.png',
  'Crystal Palace':'https://crests.football-data.org/354.png',Fulham:'https://crests.football-data.org/63.png',
  Barcelona:'https://crests.football-data.org/81.png','Real Madrid':'https://crests.football-data.org/86.png',
  'Atletico Madrid':'https://crests.football-data.org/78.png',Sevilla:'https://crests.football-data.org/559.png',
  'Inter Milan':'https://crests.football-data.org/108.png','AC Milan':'https://crests.football-data.org/98.png',
  Juventus:'https://crests.football-data.org/109.png',Napoli:'https://crests.football-data.org/113.png',
  Roma:'https://crests.football-data.org/100.png',Atalanta:'https://crests.football-data.org/102.png',
  Lazio:'https://crests.football-data.org/110.png',Fiorentina:'https://crests.football-data.org/99.png',
  'Bayern Munich':'https://crests.football-data.org/5.png','Borussia Dortmund':'https://crests.football-data.org/4.png',
  'RB Leipzig':'https://crests.football-data.org/721.png','Bayer Leverkusen':'https://crests.football-data.org/3.png',
  'Eintracht Frankfurt':'https://crests.football-data.org/19.png',Wolfsburg:'https://crests.football-data.org/11.png',
  Stuttgart:'https://crests.football-data.org/10.png',Freiburg:'https://crests.football-data.org/17.png',
};

const getTeamColor = (t) => TEAM_COLORS[t] || '#4B5563';

const mockMatches = [
  { id:1,  league:'PL',  home:'Arsenal',            away:'Chelsea',           homeScore:2, awayScore:1, status:'IN_PLAY',  minute:67, date:'15 Mar 2026', featured:true },
  { id:2,  league:'PL',  home:'Manchester City',     away:'Liverpool',         homeScore:1, awayScore:1, status:'IN_PLAY',  minute:34, date:'15 Mar 2026', featured:true },
  { id:3,  league:'PL',  home:'Tottenham',           away:'Manchester United', homeScore:3, awayScore:2, status:'FINISHED', date:'15 Mar 2026', featured:true },
  { id:4,  league:'PL',  home:'Newcastle',           away:'Aston Villa',       homeScore:1, awayScore:0, status:'FINISHED', date:'15 Mar 2026' },
  { id:5,  league:'PL',  home:'Brighton',            away:'West Ham',          homeScore:null,awayScore:null, status:'TIMED',kickoff:'17:30',date:'15 Mar 2026' },
  { id:6,  league:'PL',  home:'Everton',             away:'Wolves',            homeScore:null,awayScore:null, status:'TIMED',kickoff:'20:00',date:'15 Mar 2026' },
  { id:30, league:'PL',  home:'Crystal Palace',      away:'Fulham',            homeScore:0, awayScore:0, status:'IN_PLAY',  minute:12, date:'15 Mar 2026' },
  { id:7,  league:'LL',  home:'Barcelona',           away:'Atletico Madrid',   homeScore:3, awayScore:1, status:'FINISHED', date:'15 Mar 2026', featured:true },
  { id:8,  league:'LL',  home:'Real Madrid',         away:'Sevilla',           homeScore:2, awayScore:0, status:'IN_PLAY',  minute:78, date:'15 Mar 2026', featured:true },
  { id:9,  league:'LL',  home:'Real Sociedad',       away:'Villarreal',        homeScore:1, awayScore:1, status:'FINISHED', date:'15 Mar 2026' },
  { id:10, league:'LL',  home:'Real Betis',          away:'Athletic Bilbao',   homeScore:null,awayScore:null,status:'TIMED',kickoff:'21:00',date:'15 Mar 2026' },
  { id:11, league:'SA',  home:'Inter Milan',         away:'AC Milan',          homeScore:2, awayScore:2, status:'IN_PLAY',  minute:88, date:'15 Mar 2026' },
  { id:12, league:'SA',  home:'Juventus',            away:'Napoli',            homeScore:1, awayScore:0, status:'FINISHED', date:'15 Mar 2026' },
  { id:13, league:'SA',  home:'Roma',                away:'Atalanta',          homeScore:null,awayScore:null,status:'TIMED',kickoff:'18:00',date:'15 Mar 2026' },
  { id:14, league:'SA',  home:'Lazio',               away:'Fiorentina',        homeScore:3, awayScore:1, status:'FINISHED', date:'15 Mar 2026' },
  { id:15, league:'BL',  home:'Bayern Munich',       away:'Borussia Dortmund', homeScore:4, awayScore:2, status:'FINISHED', date:'15 Mar 2026' },
  { id:16, league:'BL',  home:'RB Leipzig',          away:'Bayer Leverkusen',  homeScore:1, awayScore:1, status:'IN_PLAY',  minute:55, date:'15 Mar 2026' },
  { id:17, league:'BL',  home:'Eintracht Frankfurt', away:'Wolfsburg',         homeScore:null,awayScore:null,status:'TIMED',kickoff:'17:30',date:'15 Mar 2026' },
  { id:18, league:'BL',  home:'Stuttgart',           away:'Freiburg',          homeScore:2, awayScore:1, status:'FINISHED', date:'15 Mar 2026' },
  { id:19, league:'PSL', home:'Kaizer Chiefs',       away:'Orlando Pirates',   homeScore:1, awayScore:2, status:'FINISHED', date:'15 Mar 2026' },
  { id:20, league:'PSL', home:'Mamelodi Sundowns',   away:'SuperSport United', homeScore:3, awayScore:0, status:'FINISHED', date:'15 Mar 2026' },
  { id:21, league:'PSL', home:'Cape Town City',      away:'Stellenbosch',      homeScore:null,awayScore:null,status:'TIMED',kickoff:'19:30',date:'15 Mar 2026' },
  { id:22, league:'PSL', home:'AmaZulu',             away:'Sekhukhune United', homeScore:0, awayScore:0, status:'IN_PLAY',  minute:22, date:'15 Mar 2026' },
  { id:23, league:'PSL', home:'Golden Arrows',       away:'Richards Bay',      homeScore:1, awayScore:1, status:'FINISHED', date:'15 Mar 2026' },
  { id:24, league:'UCL', home:'Real Madrid',         away:'Manchester City',   homeScore:2, awayScore:1, status:'FINISHED', date:'14 Mar 2026' },
  { id:25, league:'UCL', home:'Barcelona',           away:'Bayern Munich',     homeScore:3, awayScore:3, status:'FINISHED', date:'14 Mar 2026' },
  { id:26, league:'UCL', home:'Arsenal',             away:'Inter Milan',       homeScore:null,awayScore:null,status:'TIMED',kickoff:'21:00',date:'16 Mar 2026' },
  { id:27, league:'UCL', home:'Liverpool',           away:'Juventus',          homeScore:null,awayScore:null,status:'TIMED',kickoff:'21:00',date:'16 Mar 2026' },
];

const mockNews = [
  { id:1,  title:'Arsenal Close Gap on Man City After Dominant Derby Win',            source:'Sky Sports',      timeAgo:'2h ago',   category:'Match Report', gradient:'from-red-900 to-red-700',       url:'https://www.skysports.com/football' },
  { id:2,  title:'Barcelona Secure El Clasico Bragging Rights with 3-1 Triumph',      source:'ESPN FC',         timeAgo:'3h ago',   category:'Match Report', gradient:'from-blue-900 to-red-800',      url:'https://www.espn.com/soccer/' },
  { id:3,  title:'BREAKING: Mbappe Agrees Personal Terms with Man City',              source:'Fabrizio Romano',  timeAgo:'45m ago',  category:'Breaking',     gradient:'from-sky-900 to-sky-700',       url:'https://x.com/FabrizioRomano' },
  { id:4,  title:'Liverpool Boss Addresses Champions League Knockout Strategy',       source:'The Athletic',    timeAgo:'5h ago',   category:'Interview',    gradient:'from-red-800 to-red-600',       url:'https://theathletic.com/football/' },
  { id:5,  title:'La Liga Title Race: Three Teams Separated by Two Points',           source:'Marca',           timeAgo:'6h ago',   category:'Analysis',     gradient:'from-orange-900 to-yellow-800', url:'https://www.marca.com/en/football/la-liga.html' },
  { id:6,  title:'VAR Controversy Overshadows Soweto Derby as Pirates Edge Chiefs',   source:'SuperSport',      timeAgo:'1h ago',   category:'Match Report', gradient:'from-yellow-900 to-gray-800',   url:'https://supersport.com/football/psl' },
  { id:7,  title:'Sundowns Set New PSL Record with 15th Consecutive Win',             source:'KickOff',         timeAgo:'4h ago',   category:'Match Report', gradient:'from-yellow-800 to-green-900',  url:'https://www.kickoff.com/psl/' },
  { id:8,  title:'EXCLUSIVE: Chelsea Table R1.2B Bid for Serie A Star',               source:'Sky Sports',      timeAgo:'30m ago',  category:'Transfer',     gradient:'from-blue-800 to-blue-600',     url:'https://www.skysports.com/transfer-centre' },
  { id:9,  title:'Tactical Breakdown: How Arteta Outclassed Pochettino',              source:'The Guardian',    timeAgo:'7h ago',   category:'Analysis',     gradient:'from-gray-800 to-gray-600',     url:'https://www.theguardian.com/football' },
  { id:10, title:'Bayern Complete Signing of English Wonderkid for R850M',            source:'BILD',            timeAgo:'2h ago',   category:'Transfer',     gradient:'from-red-900 to-red-700',       url:'https://www.bild.de/sport/fussball/' },
  { id:11, title:'Real Madrid Injury Update: Vinicius Jr Faces Three Weeks Out',      source:'AS',              timeAgo:'8h ago',   category:'Breaking',     gradient:'from-yellow-900 to-gray-900',   url:'https://en.as.com/soccer/' },
  { id:12, title:'Premier League Top Scorers: Updated Golden Boot Race',              source:'BBC Sport',       timeAgo:'1h ago',   category:'Analysis',     gradient:'from-purple-900 to-indigo-800', url:'https://www.bbc.com/sport/football/premier-league' },
];

const CATEGORY_COLORS = {
  'Transfer':     'bg-blue-600/20 text-blue-400 border-blue-700/50',
  'Match Report': 'bg-green-600/20 text-green-400 border-green-700/50',
  'Analysis':     'bg-purple-600/20 text-purple-400 border-purple-700/50',
  'Breaking':     'bg-red-600/20 text-red-400 border-red-700/50',
  'Interview':    'bg-yellow-600/20 text-yellow-400 border-yellow-700/50',
};

// Mock standings
const STANDINGS = {
  PL: [
    { pos:1, team:'Arsenal',         p:29, w:22, d:4, l:3, gd:'+38', pts:70, form:'WWWWW' },
    { pos:2, team:'Manchester City', p:29, w:21, d:5, l:3, gd:'+32', pts:68, form:'WWDWW' },
    { pos:3, team:'Liverpool',       p:29, w:20, d:6, l:3, gd:'+29', pts:66, form:'DWWWW' },
    { pos:4, team:'Chelsea',         p:29, w:16, d:7, l:6, gd:'+14', pts:55, form:'WLDWW' },
    { pos:5, team:'Tottenham',       p:29, w:14, d:8, l:7, gd:'+8',  pts:50, form:'WDWLW' },
    { pos:6, team:'Newcastle',       p:29, w:14, d:6, l:9, gd:'+7',  pts:48, form:'WWDLW' },
    { pos:7, team:'Aston Villa',     p:29, w:13, d:7, l:9, gd:'+5',  pts:46, form:'LDWWW' },
    { pos:8, team:'Brighton',        p:29, w:12, d:8, l:9, gd:'+3',  pts:44, form:'DWDWL' },
  ],
  PSL: [
    { pos:1, team:'Mamelodi Sundowns',  p:24, w:18, d:3, l:3, gd:'+34', pts:57, form:'WWWWW' },
    { pos:2, team:'Cape Town City',     p:24, w:14, d:5, l:5, gd:'+15', pts:47, form:'WWDWL' },
    { pos:3, team:'Kaizer Chiefs',      p:24, w:13, d:6, l:5, gd:'+12', pts:45, form:'LWWWW' },
    { pos:4, team:'Orlando Pirates',    p:24, w:12, d:7, l:5, gd:'+10', pts:43, form:'DWWLW' },
    { pos:5, team:'SuperSport United',  p:24, w:11, d:5, l:8, gd:'+4',  pts:38, form:'WDLWW' },
    { pos:6, team:'Stellenbosch',       p:24, w:10, d:7, l:7, gd:'+2',  pts:37, form:'WLWDW' },
  ],
};

const highlightChannels = [
  { id:1,  name:'Premier League',        subs:'12.1M', category:'Official',  url:'https://www.youtube.com/@premierleague' },
  { id:2,  name:'UEFA Champions League', subs:'9.8M',  category:'Official',  url:'https://www.youtube.com/@ChampionsLeague' },
  { id:3,  name:'Sky Sports Football',   subs:'8.2M',  category:'Broadcast', url:'https://www.youtube.com/@SkySportsFootball' },
  { id:4,  name:'beIN SPORTS',           subs:'11.4M', category:'Broadcast', url:'https://www.youtube.com/@beINSPORTS_EN' },
  { id:5,  name:'ESPN FC',               subs:'6.1M',  category:'Broadcast', url:'https://www.youtube.com/@ESPNFC' },
  { id:6,  name:'LaLiga',               subs:'8.7M',  category:'Official',  url:'https://www.youtube.com/@LaLiga' },
  { id:7,  name:'Serie A',               subs:'5.8M',  category:'Official',  url:'https://www.youtube.com/@SerieA' },
  { id:8,  name:'Bundesliga',            subs:'6.3M',  category:'Official',  url:'https://www.youtube.com/@Bundesliga_EN' },
  { id:9,  name:'SuperSport',            subs:'1.8M',  category:'Broadcast', url:'https://www.youtube.com/@SuperSportTV' },
  { id:10, name:'Tifo Football',         subs:'2.9M',  category:'Analysis',  url:'https://www.youtube.com/@TifoFootball' },
  { id:11, name:'Goal',                  subs:'4.1M',  category:'Broadcast', url:'https://www.youtube.com/@goal' },
  { id:12, name:'B/R Football',          subs:'7.4M',  category:'Broadcast', url:'https://www.youtube.com/@brfootball' },
  { id:13, name:'Rio Ferdinand Presents',subs:'4.8M',  category:'Pundit',    url:'https://www.youtube.com/@RioFerdinandPresents' },
  { id:14, name:'Match of the Day',      subs:'7.3M',  category:'Broadcast', url:'https://www.youtube.com/@BBCSportFootball' },
  { id:15, name:'Thierry Henry',         subs:'3.6M',  category:'Pundit',    url:'https://www.youtube.com/@ThierryHenryOfficial' },
  { id:16, name:'CBS Sports Golazo',     subs:'3.2M',  category:'Broadcast', url:'https://www.youtube.com/@CBSSportsGolazo' },
  { id:17, name:'Statman Dave',          subs:'1.1M',  category:'Analysis',  url:'https://www.youtube.com/@StatmanDave' },
  { id:18, name:'SPORF',                 subs:'3.4M',  category:'Reactor',   url:'https://www.youtube.com/@SPORF' },
  { id:19, name:'OneFootball',           subs:'2.6M',  category:'Broadcast', url:'https://www.youtube.com/@OneFootball' },
  { id:20, name:'Copa90',                subs:'2.2M',  category:'Reactor',   url:'https://www.youtube.com/@Copa90' },
  { id:21, name:'iDiski TV',             subs:'580K',  category:'Broadcast', url:'https://www.youtube.com/@iDiskiTV' },
  { id:22, name:'That Football Show SA', subs:'320K',  category:'Analysis',  url:'https://www.youtube.com/results?search_query=that+football+show+sa' },
  { id:23, name:'KickOff',               subs:'450K',  category:'Broadcast', url:'https://www.youtube.com/@kickoff' },
  { id:24, name:'Mark Goldbridge',       subs:'1.8M',  category:'Reactor',   url:'https://www.youtube.com/@MarkGoldbridge' },
  { id:25, name:'Gary Neville',          subs:'2.1M',  category:'Pundit',    url:'https://www.youtube.com/@GaryNeville6' },
];

// ═══════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════
const staggerContainer = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.06}} };
const staggerItem = { hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{type:'spring',stiffness:280,damping:22}} };
const cardVariants = { hidden:{opacity:0,y:24}, visible:(i)=>({opacity:1,y:0,transition:{delay:i*0.06,type:'spring',stiffness:280,damping:22}}) };

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const TeamBadge = ({ team, size='md' }) => {
  const logo = TEAM_LOGOS[team];
  const color = getTeamColor(team);
  const dims = size==='lg' ? 'w-14 h-14' : size==='sm' ? 'w-9 h-9' : 'w-11 h-11';

  if (logo) {
    return (
      <div className={`${dims} rounded-full flex items-center justify-center flex-shrink-0 bg-white/10 border border-white/20 shadow-md overflow-hidden p-1`}>
        <img src={logo} alt={team} className="w-full h-full object-contain" loading="lazy"
          onError={(e)=>{ e.target.style.display='none'; }} />
      </div>
    );
  }
  return (
    <div className={`${dims} rounded-full flex items-center justify-center font-black text-white flex-shrink-0 border border-white/20 text-xs`}
      style={{ background: color }}>
      {team.charAt(0)}
    </div>
  );
};

const LeagueBadge = ({ code }) => {
  const meta = LEAGUE_META[code];
  return (
    <div className={`w-8 h-8 rounded-full ${meta?.bg||'bg-gray-700'} flex items-center justify-center flex-shrink-0 border border-white/10`}>
      <FaTrophy size={11} className="text-white/80" />
    </div>
  );
};

const StatusBadge = ({ match }) => {
  if (match.status==='IN_PLAY') return (
    <motion.div className="flex items-center gap-1.5" animate={{opacity:[1,0.5,1]}} transition={{duration:1.5,repeat:Infinity}}>
      <span className="w-2 h-2 rounded-full bg-red-500" style={{boxShadow:'0 0 8px rgba(239,68,68,0.8)'}} />
      <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">LIVE {match.minute}'</span>
    </motion.div>
  );
  if (match.status==='FINISHED') return (
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-800 px-2.5 py-0.5 rounded">FT</span>
  );
  return (
    <div className="flex items-center gap-1">
      <FaClock size={9} className="text-gray-500" />
      <span className="text-[10px] font-bold text-gray-400">{match.kickoff}</span>
    </div>
  );
};

const FormDot = ({ result }) => {
  const colors = { W:'bg-green-500', D:'bg-gray-500', L:'bg-red-500' };
  return <span className={`w-4 h-4 rounded-full ${colors[result]||'bg-gray-700'} inline-block`} title={result==='W'?'Win':result==='D'?'Draw':'Loss'} />;
};

// ═══════════════════════════════════════════════════════════════
// MATCH CARD
// ═══════════════════════════════════════════════════════════════
const MatchCard = ({ match, i, expanded, onToggle }) => {
  const mockEvents = match.status!=='TIMED' ? [
    { min:12, type:'goal',   team:'home', player:'Player A', detail:'Right foot shot' },
    { min:34, type:'yellow', team:'away', player:'Player B', detail:'Tactical foul' },
    { min:56, type:'goal',   team:'away', player:'Player C', detail:'Header from corner' },
    { min:78, type:'sub',    team:'home', player:'Player D on for Player E', detail:'' },
  ] : [];

  const leagueMeta = LEAGUE_META[match.league];

  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`rounded-2xl shadow-lg overflow-hidden transition-colors ${
        match.status==='IN_PLAY'
          ? 'border border-red-800/50 bg-gray-900/90'
          : expanded ? 'border border-green-800/50 bg-gray-900' : 'border border-gray-800 bg-gray-900 hover:border-gray-700'
      }`}
      style={match.status==='IN_PLAY' ? { boxShadow: '0 0 20px rgba(239,68,68,0.1)' } : {}}
    >
      {/* League accent bar */}
      <div className="h-0.5 w-full" style={{ background: leagueMeta?.accent || '#374151' }} />

      <div className="p-4 md:p-5 cursor-pointer" onClick={() => onToggle(match.id)}>
        <div className="flex items-center gap-3 md:gap-4">
          <LeagueBadge code={match.league} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              {/* Home */}
              <div className="flex-1 flex items-center justify-end gap-2">
                <p className="text-sm font-bold text-white truncate text-right">{match.home}</p>
                <TeamBadge team={match.home} size="sm" />
              </div>
              {/* Score / vs */}
              <div className="flex-shrink-0 mx-2 md:mx-4 text-center">
                {match.status==='TIMED'
                  ? <motion.span className="text-sm font-bold text-gray-500" animate={{opacity:[0.5,1,0.5]}} transition={{duration:2,repeat:Infinity}}>vs</motion.span>
                  : <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black text-green-400 tabular-nums">{match.homeScore}</span>
                      <span className="text-lg text-gray-600 font-bold">-</span>
                      <span className="text-xl font-black text-green-400 tabular-nums">{match.awayScore}</span>
                    </div>
                }
              </div>
              {/* Away */}
              <div className="flex-1 flex items-center gap-2">
                <TeamBadge team={match.away} size="sm" />
                <p className="text-sm font-bold text-white truncate">{match.away}</p>
              </div>
            </div>
            <div className="text-center mt-2 flex items-center justify-center gap-3">
              <StatusBadge match={match} />
              {match.date && <span className="text-[9px] text-gray-600 uppercase tracking-wider hidden md:inline">{match.date}</span>}
              <span className="text-[9px] text-gray-700 hidden md:inline flex items-center gap-1">
                {expanded ? <FaChevronUp size={7} /> : <FaChevronDown size={7} />} details
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}} className="overflow-hidden">
            <div className="border-t border-gray-800 px-5 py-4 space-y-3">
              <h4 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Match Events</h4>
              <div className="space-y-2">
                {mockEvents.map((ev, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="text-green-400 font-bold w-8">{ev.min}'</span>
                    <span className={`w-5 text-center ${ev.type==='goal'?'text-green-400':ev.type==='yellow'?'text-yellow-400':ev.type==='red'?'text-red-400':'text-blue-400'}`}>
                      {ev.type==='goal'?'⚽':ev.type==='yellow'?'🟨':ev.type==='red'?'🟥':'🔄'}
                    </span>
                    <span className="text-white font-semibold">{ev.player}</span>
                    {ev.detail && <span className="text-gray-500">— {ev.detail}</span>}
                    <span className={`ml-auto text-[9px] uppercase tracking-wide ${ev.team==='home'?'text-blue-400':'text-purple-400'}`}>
                      {ev.team==='home' ? match.home : match.away}
                    </span>
                  </div>
                ))}
                {!mockEvents.length && <p className="text-gray-600 text-xs">Match hasn't started. Events will appear here during play.</p>}
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button className="flex items-center gap-2 text-xs text-green-400 bg-green-900/20 border border-green-800/40 rounded-lg px-3 py-1.5 hover:bg-green-900/30 transition-all">
                  <FaPlayCircle size={11} /> Watch Highlights
                </button>
                <button className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 hover:bg-gray-700 transition-all">
                  <FaExternalLinkAlt size={9} /> Full Report
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════════════════
const TABS = [
  { key:'live',       label:'Live Fixtures',  icon:<FaFutbol /> },
  { key:'standings',  label:'Standings',      icon:<FaTrophy /> },
  { key:'news',       label:'News',           icon:<FaNewspaper /> },
  { key:'highlights', label:'Highlights',     icon:<FaYoutube /> },
];

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function FixturesPage() {
  const [tab,         setTab]         = useState('live');
  const [leagueFilter,setLeagueFilter]= useState('ALL');
  const [expanded,    setExpanded]    = useState(null);
  const [standingsLeague, setStandingsLeague] = useState('PL');

  const toggleExpand = (id) => setExpanded(p => p===id ? null : id);

  const filteredMatches = leagueFilter==='ALL'
    ? mockMatches
    : mockMatches.filter(m => m.league===leagueFilter);

  const liveMatches     = filteredMatches.filter(m => m.status==='IN_PLAY');
  const finishedMatches = filteredMatches.filter(m => m.status==='FINISHED');
  const upcomingMatches = filteredMatches.filter(m => m.status==='TIMED');

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="relative py-14 px-4 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #052e16 0%, #0d1117 60%, #111827 100%)',
        borderBottom: '1px solid rgba(34,197,94,0.15)',
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.05) 0%, transparent 60%)' }} />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:280,damping:22}}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.span style={{fontSize:'2rem'}} animate={{rotate:[0,10,-10,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>⚽</motion.span>
              <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:'clamp(2.5rem,6vw,4rem)', letterSpacing:'0.06em', color:'#f9fafb', textShadow:'0 0 40px rgba(34,197,94,0.3)' }}>
                Live <span style={{color:'#22c55e'}}>Fixtures</span>
              </h1>
            </div>
            <p style={{ fontFamily:"'Inter', sans-serif", color:'#6b7280', fontSize:'1rem' }}>
              Live scores, standings, football news & video highlights
            </p>
          </motion.div>

          {/* Live match count badge */}
          <motion.div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{background:'rgba(239,68,68,0.12)',border:'1px solid rgba(239,68,68,0.3)'}}
            animate={{boxShadow:['0 0 10px rgba(239,68,68,0.15)','0 0 25px rgba(239,68,68,0.3)','0 0 10px rgba(239,68,68,0.15)']}} transition={{duration:2,repeat:Infinity}}>
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-400 text-sm font-bold">{liveMatches.length} Matches Live Now</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── TABS ──────────────────────────────────────────────── */}
        <div className="flex gap-2 md:gap-3 mb-8 overflow-x-auto pb-1">
          {TABS.map(({ key, label, icon }) => (
            <motion.button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all"
              style={{
                fontFamily:"'Montserrat', sans-serif",
                background: tab===key ? 'linear-gradient(135deg, #059669, #22c55e)' : 'rgba(255,255,255,0.05)',
                color: tab===key ? '#fff' : '#9ca3af',
                border: `1px solid ${tab===key ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: tab===key ? '0 0 20px rgba(34,197,94,0.3)' : 'none',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{icon}</span>
              {label}
            </motion.button>
          ))}
        </div>

        {/* ── TAB CONTENT ───────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {tab==='live' && (
            <motion.div key="live" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} transition={{type:'spring',stiffness:280,damping:22}}>

              {/* League filter */}
              <div className="flex gap-2 flex-wrap mb-6">
                {['ALL', ...Object.keys(LEAGUE_META)].map(code => (
                  <button key={code} onClick={() => setLeagueFilter(code)}
                    className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                    style={{
                      fontFamily:"'Montserrat', sans-serif",
                      background: leagueFilter===code ? LEAGUE_META[code]?.accent || '#22c55e' : 'rgba(255,255,255,0.06)',
                      color: leagueFilter===code ? '#fff' : '#9ca3af',
                      border: `1px solid ${leagueFilter===code ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                    {code==='ALL' ? '🌍 All' : LEAGUE_META[code]?.name || code}
                  </button>
                ))}
              </div>

              {/* Live now */}
              {liveMatches.length > 0 && (
                <div className="mb-8">
                  <h2 className="section-heading text-white text-lg mb-4">
                    <span className="text-red-400 animate-pulse">🔴</span> Live Now
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {liveMatches.map((m, i) => <MatchCard key={m.id} match={m} i={i} expanded={expanded===m.id} onToggle={toggleExpand} />)}
                  </div>
                </div>
              )}

              {/* Finished */}
              {finishedMatches.length > 0 && (
                <div className="mb-8">
                  <h2 className="section-heading text-white text-lg mb-4">Final Scores</h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {finishedMatches.map((m, i) => <MatchCard key={m.id} match={m} i={i} expanded={expanded===m.id} onToggle={toggleExpand} />)}
                  </div>
                </div>
              )}

              {/* Upcoming */}
              {upcomingMatches.length > 0 && (
                <div className="mb-8">
                  <h2 className="section-heading text-white text-lg mb-4">⏰ Upcoming</h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {upcomingMatches.map((m, i) => <MatchCard key={m.id} match={m} i={i} expanded={expanded===m.id} onToggle={toggleExpand} />)}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {tab==='standings' && (
            <motion.div key="standings" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} transition={{type:'spring',stiffness:280,damping:22}}>
              {/* League selector */}
              <div className="flex gap-2 flex-wrap mb-6">
                {Object.keys(STANDINGS).map(code => (
                  <button key={code} onClick={() => setStandingsLeague(code)}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{
                      fontFamily:"'Montserrat', sans-serif",
                      background: standingsLeague===code ? LEAGUE_META[code]?.accent || '#22c55e' : 'rgba(255,255,255,0.05)',
                      color: standingsLeague===code ? '#fff' : '#9ca3af',
                      border: `1px solid ${standingsLeague===code ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                    {LEAGUE_META[code]?.name || code}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-800" style={{background:'var(--color-surface)'}}>
                {/* Table header */}
                <div className="grid grid-cols-[auto,1fr,repeat(6,auto)] gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-800" style={{fontFamily:"'Montserrat', sans-serif"}}>
                  <span>#</span><span>Team</span><span>P</span><span>W</span><span>D</span><span>L</span><span>GD</span><span className="text-green-400">Pts</span>
                </div>
                {(STANDINGS[standingsLeague] || []).map((row, i) => (
                  <motion.div
                    key={row.team}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid grid-cols-[auto,1fr,repeat(6,auto)] gap-2 px-4 py-3 items-center text-sm border-b border-gray-800/50 last:border-0 ${i%2===0?'bg-white/[0.02]':''} hover:bg-white/[0.04] transition-colors`}
                  >
                    <span className="font-bold text-gray-400 w-6 text-center">{row.pos}</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <TeamBadge team={row.team} size="sm" />
                      <span className="font-semibold text-white truncate" style={{fontFamily:"'Inter', sans-serif"}}>{row.team}</span>
                      {row.pos<=4 && <span className="text-[9px] text-green-400 font-bold hidden md:inline">UCL</span>}
                    </div>
                    <span className="text-gray-400 text-center">{row.p}</span>
                    <span className="text-green-400 text-center font-semibold">{row.w}</span>
                    <span className="text-gray-400 text-center">{row.d}</span>
                    <span className="text-red-400 text-center">{row.l}</span>
                    <span className="text-gray-400 text-center">{row.gd}</span>
                    <span className="text-white font-black text-center">{row.pts}</span>
                  </motion.div>
                ))}
              </div>

              {/* Form guide */}
              <div className="mt-6 p-4 rounded-2xl border border-gray-800" style={{background:'var(--color-surface)'}}>
                <h3 className="section-heading text-white text-base mb-4">Form Guide (Last 5)</h3>
                <div className="space-y-3">
                  {(STANDINGS[standingsLeague]||[]).slice(0,5).map(row => (
                    <div key={row.team} className="flex items-center gap-3">
                      <span className="text-sm text-gray-300 w-40 truncate" style={{fontFamily:"'Inter',sans-serif"}}>{row.team}</span>
                      <div className="flex gap-1">
                        {row.form.split('').map((r,i) => <FormDot key={i} result={r} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab==='news' && (
            <motion.div key="news" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} transition={{type:'spring',stiffness:280,damping:22}}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockNews.map((article, i) => {
                const catCls = CATEGORY_COLORS[article.category] || 'bg-gray-700/20 text-gray-400 border-gray-700';
                return (
                  <motion.a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="rounded-2xl overflow-hidden border border-gray-800 cursor-pointer block hover:border-gray-600 transition-colors"
                    whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}
                  >
                    {/* Gradient banner */}
                    <div className={`h-24 bg-gradient-to-br ${article.gradient} relative flex items-end p-3`}>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${catCls}`} style={{fontFamily:"'Montserrat',sans-serif",textTransform:'uppercase',letterSpacing:'0.08em'}}>
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4" style={{background:'var(--color-surface)'}}>
                      <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-3" style={{fontFamily:"'Oswald', sans-serif", textTransform:'uppercase'}}>
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500" style={{fontFamily:"'Inter',sans-serif"}}>
                        <span className="font-semibold text-green-400">{article.source}</span>
                        <span>{article.timeAgo}</span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          )}

          {tab==='highlights' && (
            <motion.div key="highlights" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} transition={{type:'spring',stiffness:280,damping:22}}>
              <p className="text-gray-500 text-sm mb-6" style={{fontFamily:"'Inter',sans-serif"}}>Top YouTube channels for football highlights, analysis & reaction.</p>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {highlightChannels.map((ch, i) => {
                  const catColors = { Official:'text-yellow-400 bg-yellow-900/20 border-yellow-800/40', Broadcast:'text-blue-400 bg-blue-900/20 border-blue-800/40', Pundit:'text-purple-400 bg-purple-900/20 border-purple-800/40', Analysis:'text-cyan-400 bg-cyan-900/20 border-cyan-800/40', Reactor:'text-green-400 bg-green-900/20 border-green-800/40' };
                  return (
                    <motion.a
                      key={ch.id}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-600 transition-all"
                      style={{background:'var(--color-surface)'}}
                      whileHover={{ y:-2, x:2, borderColor:'rgba(34,197,94,0.3)' }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)'}}>
                        <FaYoutube size={18} className="text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate" style={{fontFamily:"'Inter',sans-serif"}}>{ch.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-gray-500 text-xs">{ch.subs} subscribers</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${catColors[ch.category]||'text-gray-400 bg-gray-800 border-gray-700'}`} style={{fontFamily:"'Montserrat',sans-serif",textTransform:'uppercase',letterSpacing:'0.06em'}}>
                            {ch.category}
                          </span>
                        </div>
                      </div>
                      <FaExternalLinkAlt size={11} className="text-gray-600 flex-shrink-0" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Join CTA */}
        <motion.div
          className="mt-16 rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background:'linear-gradient(135deg, #052e16, #0d1117)', border:'1px solid rgba(34,197,94,0.2)' }}
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{type:'spring',stiffness:280,damping:22}}
        >
          <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle at 50% 0%, rgba(34,197,94,0.1) 0%, transparent 60%)'}} />
          <div className="relative z-10">
            <h2 className="gradient-text mb-3" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.8rem,4vw,2.8rem)',letterSpacing:'0.06em'}}>
              WANT TO PLAY IN THE LEAGUE?
            </h2>
            <p className="text-gray-400 mb-6" style={{fontFamily:"'Inter',sans-serif"}}>
              Join 5s Arena's competitive 5-a-side league. Weekly games, live standings, and a trophy at stake.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/league">
                <motion.button className="btn-primary px-6 py-3 rounded-xl font-bold text-white" style={{fontFamily:"'Montserrat',sans-serif"}} whileHover={{y:-2}} whileTap={{scale:0.97}}>
                  🏆 Join the League
                </motion.button>
              </Link>
              <a href="https://wa.me/27637820245" target="_blank" rel="noopener noreferrer">
                <motion.button className="px-6 py-3 rounded-xl font-bold" style={{background:'rgba(37,211,102,0.15)',border:'1px solid rgba(37,211,102,0.4)',color:'#25d366',fontFamily:"'Montserrat',sans-serif"}} whileHover={{y:-2,background:'rgba(37,211,102,0.25)'}} whileTap={{scale:0.97}}>
                  📱 WhatsApp Us
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
