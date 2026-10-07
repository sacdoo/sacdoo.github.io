/* Projects: SAM SEOUL case studies (samseoul.com/branding, credited to 엄태은) and sac studio work on Behance.
   Media tuples: [type, src, widthPercent, aspectRatio]
   type: 'i' image (framerusercontent.com/images/...), 'm' mp4 (framerusercontent.com/assets/...), 'v' Vimeo id,
         'b' Behance image (full URL), 'c' Behance/Adobe video id (www-ccv.adobe.io)
   'L' local image / 'l' local mp4 (assets/media) / 'x' local interactive page (iframe)
   thumb 'lv': [ 'lv', local mp4 in assets/media, still-frame seconds, optional zoom ]
   Body items: string = text block, array = media. Order and widths mirror the original case pages. */
window.SOURCE_BASE = 'https://samseoul.com/branding/';
window.PROJECTS = [
{
  slug:'kbank2025', title:'Kbank', client:'Kbank', year:'2025',
  bg:'white',
  type:'Rebranding',
  contrib:'Keyvisual Design, Motion Identity, Brand Film',
  role:['Design Strategy & Concept','Visual Identity Design','Photography & Brand Film'],
  thumb:['i','D7FrS2pCx3tkhGFpvC2UyA92Do.webp?width=640&height=360'],
  hero:['l','kbank_1211576204.mp4',100,1.778],
  body:[
    `Discovering Good Feelings in Financial Life, Kbank`,
    `Since launching in 2017 as Korea’s first internet-only bank, Kbank has grown into a financial platform used by more than 15 million customers, and set out to become a brand that cares about how its customers feel, not just how convenient it is. The project began with one question: when does finance make people feel good? Beyond big milestones like investing and saving, we found those moments in everyday discoveries—a welcome notification, a forgotten account, a recommendation that fits just right—and defined “Discovery” as the heart of a feel-good financial life. The View Finder motif brings this idea to life, framing everyday moments from a new perspective and anchoring a visual identity that spans graphics, color, photography, key visuals, illustration, motion, launcher icons and slogan lettering.`,
    ['l','kbank_1211576202.mp4',96,1.778],
    ['i','9f6ZnAsC6SAAmg3c8hKJFxLRJw.jpg?width=1920&height=1080',96,1.778],
    ['i','mQV5y4OifaqhKU0uTXyDHvDlmAM.jpg?width=1920&height=1080',96,1.778],
    ['l','kbank_1211576201.mp4',96,1.5],
    ['l','kbank_1211576203.mp4',96,1.778],
    ['l','kbank_1211576213.mp4',96,1.6],
    ['l','kbank_1211576216.mp4',96,1.778],
    ['l','kbank_1211576219.mp4',96,1.778],
    ['l','kbank_1211576220.mp4',96,1.6],
    ['i','ONhCkdyJ273Mf2dPLhcY27hHr6E.jpg?width=1920&height=1080',96,1.778],
    ['i','Dqwp59GvDzRImmd2AVBzxtCJM.jpg?width=1920&height=1080',96,1.778],
    ['l','kbank_1211576230.mp4',96,1.263],
    ['l','kbank_1211576234.mp4',96,1.778],
    ['l','kbank_1211576236.mp4',96,1.778],
    ['i','W0vfDW4NwwZAJwCDppT7wfn9ATs.jpg?width=1920&height=1080',96,1.778],
    ['l','kbank_1211576237.mp4',96,1.778],
    ['l','kbank_1211576247.mp4',96,1.778],
    ['l','kbank_1211576251.mp4',96,1.5],
    ['l','kbank_1211576252.mp4',96,1.778],
    ['l','kbank_1211576253.mp4',96,1.778]
  ],
  credits:[['Project owner','Kbank'],['Executive Director','김지훈'],['Creative Director','김지현, 하동미'],['Designer','한승민, 이윤재, 윤하영, 엄태은'],['Motion Graphics','한승민, 엄태은']]
},
{
  slug:'rise-etf', title:'Rise ETF', client:'KB Asset Management KB자산운용', year:'2023',
  bg:'white',
  type:'Rebranding',
  contrib:'Brand Design, Motion Identity, Brand Film',
  role:['Brand Concept','Brand Strategy','Visual Identity'],
  thumb:['i','GDX0MY4Gw3PF1p2WWPE87ubZw.gif?scale-down-to=1024&width=1280&height=720'],
  hero:['i','NcrXVD3wBLaReNghXaSCn4zgNc.png?width=1920&height=1081',100,1.8],
  body:[
    `The Tomorrow Ahead, the Rising Investment. RISE ETF.`,
    `As ETFs emerged as the next wave after the stock and crypto boom, KB Asset Management renewed KB STAR ETF, Korea’s third-largest ETF brand, to grow with more individual investors as a healthy pension investment partner. Under the strategy “Impact & Imprint,” we developed the name RISE, inspired by the steady, hopeful image of a sun that rises every day, along with the slogan “The tomorrow ahead, the rising investment.” The black logo climbing toward the upper right expresses agility and growing assets, while KB Yellow keeps the family look. A stacking module graphic and a distinctive “R” joined with a line visualize rise and growth, and work as a platform that introduces the full range of ETFs.`,
    ['m','iXO9JcaM6ixoVyGJLmcsjOz1EJU.mp4',96,1.778],
    ['m','PnN4LXGgbplzhUYTfeJP0f9yxI.mp4',96,1.778],
    ['m','qCmjaSegpDfcoiljP19FRCok4.mp4',48,0.8],
    ['i','nYuJSGWI5GYZn4fo2dQm3K2hw.jpg?scale-down-to=2048&width=1920&height=2404',48,0.799],
    ['i','CMh7znDmt1liBeL6ozhc4pJSU4.jpg?width=1920&height=1200',96,1.6],
    ['i','G3NC2oLI22ciRiPy91kq7kczZLc.jpg?scale-down-to=2048&width=1920&height=2404',48,0.799],
    ['m','zI7muTvrLgNrt4wCD3IcFDM6JLo.mp4',48,0.8],
    ['i','fcvp8lepCqfJ0QUkl18YWK6Ut0.jpg?width=1920&height=1200',96,1.6],
    ['m','HzTus7zEKeEoNyDuSk3dSbJ6KFM.mp4',96,1.778],
    ['i','BbmfaOxcV0ZLsqATrvNXy0fTXg.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['i','cpAMgKhUUBoOIiyAyPUBz2YGI4.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['m','10sH2vvDNsVY0HngnD4SozLImkg.mp4',96,1.778],
    ['i','MKjignJTMBA9FwEpVeWRkR7snA.jpg?width=1920&height=1200',96,1.6],
    ['i','ADLeHFbetLjlSOFMugbR79III.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['i','vewmU1QUfJk1TobLhC0wVCNE.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['i','hPS7oySfbNfZbdmU0bBFcGrbagA.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['i','lksiLdYKQdeJNZs4DNG7cmVvpyk.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['i','F2EemxGyhpre6LREXQbh3zuZxk.jpg?scale-down-to=2048&width=1920&height=2399',48,0.8],
    ['i','KtbSkKJh2omRiQBcCP8cj0ZM9Sg.jpg?scale-down-to=2048&width=1920&height=2400',48,0.8],
    ['i','210sJeK95xWUGELsw5FOCfJCoFY.jpg?width=1920&height=1200',96,1.6],
    ['m','rcCqM7yuVOIq7Gxcc2f8w98megY.mp4',96,1.778]
  ],
  credits:[['Project owner','KB Asset Management KB자산운용'],['Executive director','이해승'],['Creative director','강요셉, 김지완'],['Conceptor','김보미, 김세화'],['Designer','정자용, 김현지, 이연선'],['Motion Graphic','엄태은']]
},
{
  slug:'cjone', title:'CJ ONE', client:'CJ OliveNetworks', year:'2023',
  bg:'black',
  type:'Rebranding',
  contrib:'Brand Design, Motion Identity',
  role:['Brand Concept','Visual Identity'],
  thumb:['i','IvrkBB9Xs7xpVPMlWqHKiUvqw.gif?width=720&height=720'],
  hero:['m','e7JJx5zEYsYndmckLc9n2NHiqc.mp4',100,1.778],
  body:[
    `Sparkling Everyday, CJ ONE`,
    `As competition shrank partner networks and point rewards, membership programs drifted toward one-off benefits and struggled to build lasting relationships. CJ ONE answered by opening its membership beyond CJ affiliates and repositioning as a lifestyle membership with cultural benefits beyond points, together with a full renewal of a brand image that had stayed the same for 21 years. Every graphic asset reflects the form and function of a prism: the new logo carries over the equity of the original in a sturdier shape that holds up on small screens, a tone-on-tone gradient palette captures light passing through a prism, and the icons use translucent materials and sparkling color.`,
    ['m','JYlLzhFd3swrfEpX3VjZH5RqTyI.mp4',96,1.6],
    ['m','RaGP9APppPDm9VJ3773bk1w.mp4',96,1.6],
    ['i','5031vglzcYpaXxpXos3prXVDes.png?width=4001&height=3084',96,1.297],
    ['i','dKyltR4muxDlFD8zvvQfA28sFx4.png?width=3841&height=2160',96,1.778],
    ['m','CMcdZ17zfN3RP03D5k8vC3UbVx4.mp4',96,1.6],
    ['m','PUBrfYkdKQj91n1A3M9GhGgHhTk.mp4',96,1.6],
    ['m','lFbaZfXWMyJLSn5PGh05UxAvNk.mp4',96,1.6],
    ['m','UQw35xcUVBO5wQl8hVdlsOnXaQQ.mp4',96,1.6],
    ['m','XjCgqiapcRtEUtyy6mmF1MfllE.mp4',96,1.6],
    ['m','iyNrFF7txqsBlcwpoaAvpXtsPg.mp4',96,1.6],
    ['i','zpRbRMHhf7bFnCue4fMPQ9HyzPs.png?width=1920&height=1200',96,1.6],
    ['m','tujaQBKT7k01UTav7Vs29iwX5c.mp4',96,1.6],
    ['m','E1LFWdK2sgDfZvO1QokpTOIKPQ.mp4',96,1.6],
    ['m','StQBhnzyB8EvpjqFtMoKCJFBPb8.mp4',96,1.6],
    ['i','P1tz3kQ1tiMkARfz636JSksFH0.png?width=1920&height=1200',96,1.6],
    ['i','vTpx5M2lAaC8PSp0NjVKoXHwzo.png?width=1920&height=1200',96,1.6],
    ['m','KibeYLFTeQKXA6JRfVCoUZYdxM.mp4',96,1.6],
    ['m','StEO23BRKMnydKlnCpntVO2vZUw.mp4',96,1.778]
  ],
  credits:[['Project owner','CJ OliveNetworks'],['Executive director','이해승'],['Creative director','전병선'],['Concept','배금조, 송주리'],['Designer','박윤서, 윤현동, 신봉천, 김진호'],['Motion Graphic','양희수, 엄태은']]
},
{
  slug:'kodex-brand', title:'Kodex', client:'Samsung Asset Management 삼성자산운용', year:'2023',
  awards:[{name:'iF Design Award 2024 — Winner, Communication Branding', img:'assets/awards/samseoul-kodex-if.png'}],
  bg:'white',
  type:'Rebranding',
  contrib:'Brand Design, Motion Identity, Brand Film',
  role:['Research & Concept Planning','Verbal Identity','Visual Identity Design','Brand Film','Brand Campaign'],
  thumb:['i','KOr16F4rDiDTpmL7kXOdEoJ0h90.gif?scale-down-to=1024&width=1200&height=636'],
  hero:['i','lwD4hdvF1V1BGZbrNIwzn6VU.jpg?width=3738&height=2160',100,1.8],
  body:[
    `Every Investment in the World, Kodex`,
    `Launched by Samsung Asset Management in 2002, Kodex is Korea’s first ETF brand and has long held the top spot in the domestic market. As mobile apps brought a wave of young individual investors in their 20s and 30s, the brand was renewed for its 20th anniversary to look younger and more inviting to a new generation of customers, and to lay the groundwork for growing into a global brand.`,
    ['m','jId3vNSRpAantwS6NaGivWYB4nM.mp4',96,1.463],
    `Strong as a Symbol,
Flexible in Use`,
    `The old logo was a red wordmark standing for a rising stock market. When we asked for first impressions at the start of the project, most answers were negative, such as “conservative,” “rigid” and “old,” while far fewer called it “friendly” or “creative.” Tellingly, many more people picked blue than red as the color that suits Kodex, simply because blue means Samsung to Koreans. Using blue alone lets the brand carry Samsung’s trust and familiarity as a kind of endorsement and makes it easier for first-time customers to approach. To build recognition and a flexible brand image, we also created a strong yet simple symbol inspired by a hot air balloon and a map pointer, likening investors’ asset growth and goals to an enjoyable journey and lowering the psychological barrier for people new to ETFs.`,
    ['i','VJDTmFQRgTm49fjeSLwREP9n8.png?scale-down-to=2048&width=10667&height=5000',96,2.133],
    ['m','d9SJcOiHqMxKeb5ejlsxYSd16k.mp4',96,1.6],
    ['i','tD93oZ9CLLwFwDBZx6zO5C24.png?scale-down-to=2048&width=2560&height=1600',96,1.6],
    ['m','EmICfD8xZxAGyTsHD0GbcwDVWQ.mp4',96,1.6],
    `Turning Unfamiliar Investing
into Exciting Anticipation.`,
    `To present the new Kodex as a flexible, scalable global brand, we paired the main blue with a vibrant secondary palette for a young, playful look unlike other financial brands, and used images of people radiating confidence and a positive attitude instead of suited financiers. Colorful hot air balloons travel across TV, subway platforms and social media, building anticipation for an investment journey full of joyful moments, just like the brand slogan, “Become the road you want to take.”`,
    ['m','F8hpNAG85QHLc09veFJS5M35vyQ.mp4',96,1.6],
    ['m','m4wQTq7wjoY12JqDOoTxdCxVk.mp4',96,1.551],
    ['m','ojKD9K4ROCipcjemZvppGIMYM.mp4',96,1.463],
    ['i','vbvLTFTnJGRNgRN7wDf3BhMCI.png?scale-down-to=2048&width=2560&height=1500',96,1.707],
    ['m','NLr7AuDYiv3Tob6uMo6y25qoRM.mp4',96,0.891],
    ['i','zRZzCBzJGL8CdM9neGpWh53kW4.png?scale-down-to=2048&width=2560&height=1400',96,1.829],
    ['i','eTHGzyM0eZkoTp2YeoQt0LmpwM.png?scale-down-to=2048&width=2560&height=1600',96,1.6],
    `KoAct ETF`,
    `After the successful Kodex renewal, Samsung Active Asset Management, a subsidiary of Samsung Asset Management, launched its new ETF brand KoAct in August 2023. Every visual except the symbol follows the Kodex system, helping the new brand settle into the market with stability.`,
    ['m','6GANSa1oM8bM1HZXIX5s5KtBydY.mp4',96,2.415],
    ['i','DVrdsPIE1KJFjGcnghCzwWXpA.png?scale-down-to=2048&width=2560&height=1500',96,1.707],
    ['m','cN1MQNRo7fWtHedjkOZe1Jbc2w.mp4',96,1.463],
    ['m','hqOQpW8yV7IABCKF13qnu9d9hUY.mp4',96,1.778]
  ],
  credits:[['Project owner','Samsung Asset Management 삼성자산운용'],['Executive director','김지훈'],['Creative director','이해승'],['Concept','박상진, 전용우'],['Designer','김지완, 하동미, 이연선, 이건희'],['Motion graphics','엄태은']]
},
{
  slug:'zic', title:'SK enmove ZIC', client:'SK Enmove', year:'2023',
  awards:[{name:'Design iT Award 2023 — Silver (Design Leader\'s Choice)', img:'assets/awards/samseoul-zic-it.png'}],
  bg:'black',
  type:'Rebranding',
  contrib:'Brand Design, Motion Identity, Brand Film',
  role:['Brand Strategy & Concept','Visual Identity','Editorial Design'],
  thumb:['i','knr445NYIhuuhWYipWCBBtvCzE.gif?scale-down-to=1024&width=4000&height=2230'],
  hero:['m','2mAME38Y8uoJqx6JnjRVR2Xtmsk.mp4',100,1.791],
  body:[
    `SK ZIC, the No.1 Engine Oil Brand`,
    `Created in 1995 with a logotype inspired by the 21st century (21C), SK enmove’s lubricant brand ZIC has become a leading name in lubricants at home and abroad. As EVs, sustainability and ESG reshaped the industry, ZIC expanded into EV gear oil and data center cooling fluids and needed a renewal fit for a “fluid solution brand.” Under the slogan “Creating New Flow,” a vision of leading the next flow of future technology beyond lubricants, we developed a logo and package graphics that emphasize flow and a forward-looking image.`,
    ['m','hBPWADWILvGUae9rm8m5QRO1A9E.mp4',96,1.733],
    ['i','HGwCGM15ODmsImohh9OpOJKUHU.jpg?scale-down-to=2048&width=3585&height=2038',96,1.759],
    ['i','nBldlQylYcaHrCornvbD8SzBlvY.jpg?scale-down-to=2048&width=3585&height=2003',96,1.757],
    ['i','FuG01cIoFL7TFdl1Baa2DVXak.jpg?width=1920&height=1340',96,1.433],
    ['i','tDoWu1OrX19y3DEyt6fSqDM8RA.jpg?scale-down-to=2048&width=3585&height=1153',96,3.109],
    ['i','Y0zBcb9GGsbHfXsut6zJaEzS38.gif?width=1920&height=1080',96,1.778],
    ['i','yaBkh9wA0fmxlhDg4pFPLWouhxg.png?scale-down-to=2048&width=1920&height=2345',96,0.819],
    ['i','5MIotwRkvFpyUySNyYGotgSez0.png?scale-down-to=2048&width=1920&height=2271',96,0.845],
    ['i','JY9ma6OdjCYVNfrV8rIqcFEjepY.png?width=1920&height=1254',96,1.531],
    ['i','TieCfgrLzILAgRvs3OaQdUdEiQ.jpg?scale-down-to=2048&width=3500&height=2100',96,1.667],
    ['i','QoXI8BDWIXMSqbo31gIsDqirZrs.jpg?scale-down-to=2048&width=3000&height=2250',96,1.333],
    ['i','qtnVIT6rs9yGUIlv71NaQ9kKfF8.jpg?scale-down-to=2048&width=3501&height=1900',96,1.843],
    ['m','ECNGQGqkp0arS5c6y1lFljrNnc.mp4',96,1.778]
  ],
  credits:[['Project owner','SK enmove'],['Executive director','이창호'],['Design director','류기백'],['Creative director','전병선'],['Lead designer','배금조, 신선영'],['Designer','송주리, 박부근, 엄태은'],['Editorial Design','왕호경, 소우진'],['Motion Graphic','엄태은']]
},
{
  slug:'wooricard', title:'WOORICARD', client:'WOORICARD 우리카드', year:'2023',
  bg:'black',
  type:'Rebranding',
  contrib:'Motion Identity, Brand Film',
  role:['Brand Strategy & Concept','Visual Identity'],
  thumb:['i','a7VEaPeMpVK5B4XrqjynNuNNE.jpg?width=1672&height=1040'],
  hero:['i','WuFzfNA3h7MiyERcuGyAG3ig.png?width=5834&height=3647',100,1.8],
  body:[
    `Renewing the Basics, Redefining the Standard`,
    `WOORICARD’s “Card’s Standard” line is known for some of the best benefits on the market, yet apart from character collaborations it was never a card people wanted for its design. In 2023, its tenth year since spinning off from Woori Bank’s credit card business and the year it launched its own payment network, Woori Card set out to make a bigger leap. We redefined its brand identity for the long term and built a design system that delivers a consistent brand experience.`,
    ['i','op2trOBPfxwRdLodaJ96P2hzQtA.png?scale-down-to=2048&width=5834&height=1757',96,3.32],
    ['m','Zx9SMPPcFRkOy9oiaCvMkElLpeg.mp4',96,2.34],
    `The Aesthetics of Boundaries,
True to Woori`,
    `Woori Card runs two card brands: Card’s Standard and NU, a new and unique card brand launched in 2022. Next to NU, Card’s Standard felt dated, especially its slanted serif logotype, so we renewed it as well even though it was not in the original plan, and stripped NU of its spelled-out meaning and Korean label. With distinctive designs no longer enough to stand out in a fierce card design race, Woori Card wanted cards that are recognizable at a glance. Built on the concept “Aesthetics of Boundaries,” which spans every brand, the design system chooses a layout to fit each product, expressed through playful graphics or simply through premium materials and textures. The issuance package also moved beyond the standard window envelope, so customers experience the new brand from the moment they open it.`,
    ['m','JTG7UE900yp69EjzJrBdv1r5ryU.mp4',96,1.88],
    ['m','uEN11UHL9asskCBxnNEJ9tAlSs.mp4',96,1.255],
    ['i','NC843kQoBltI1zD7k95qDuD3PY.png?scale-down-to=2048&width=5834&height=4164',96,1.401],
    ['i','hTBMTv8qXW8HX1EIESC2pu7g.png?scale-down-to=2048&width=5834&height=3480',96,1.676],
    ['i','UkrFJ2BnrgwtKaZ1HbGicWqu25M.jpg?scale-down-to=2048&width=5834&height=3342',96,1.746],
    ['m','nCQhtzWa2GZBmZJEfijwULMj1c.mp4',96,2.462],
    ['i','nBdoYy6qv7mbxNmYZIQieHNY.png?scale-down-to=2048&width=5834&height=4164',96,1.401],
    ['i','ndQUD9JAl9gi78SBWy3VJIPTGKs.jpg?scale-down-to=2048&width=2560&height=1310',96,1.954],
    ['m','sQVQ975A6ehN0fYAhqgcj3gBxN4.mp4',96,2.462],
    ['i','VdhkAkxIXSwxQ886zryk2rM8.png?scale-down-to=2048&width=5834&height=4165',96,1.401],
    ['i','DBCntTndGHzp1XwtK70yBGmMue8.png?scale-down-to=2048&width=5834&height=2985',96,1.954],
    ['m','4mVSe2jMSejTzjZHuPZ5lQ4.mp4',96,2.462],
    ['i','grlt23gEK8GAiIoD8XoPusyA4L4.jpg?scale-down-to=2048&width=2560&height=1710',96,1.497],
    ['i','cGosczaLT8A8BTA7c6uwoTXwaeY.jpg?scale-down-to=2048&width=2560&height=1513',96,1.692],
    ['i','kjxivPSxaNPpPGbDW6Un6geymk.jpg?scale-down-to=2048&width=2486&height=1680',96,1.48],
    ['m','8AefE0M25D16nXxlqXi2t5WdBg.mp4',96,1.778]
  ],
  credits:[['Project owner','WOORICARD 우리카드'],['Executive director','이해승'],['Creative director','강요셉, 하동미'],['Conceptor','김보미, 전용우'],['Designer','이연선, 이건희, 박윤서, 윤현동, 오인혁'],['Motion Graphic','엄태은']]
},
{
 "slug": "burberry-knight",
 "bg": "black",
 "label": "Burberry",
 "type": "Concept Film",
 "source": "personal",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2026",
 "title": "Burberry Knight",
 "contrib": "Concept, Direction, Brand Film",
 "credits": [],
 "heroSound": true,
 "hero": ["l", "burberry-knight-h.mp4", 100, 1.7778],
 "thumb": ["lv", "burberry-knight-loop.mp4", 14],
 "body": [
  "The knight leaves the emblem.",
  "A concept film for Burberry. The Equestrian Knight steps out of the logo and rides through a menswear store after hours — banner raised, shield bearing the B — before returning to the emblem it came from.",
  ["L", "burberry-knight-01.jpg", 20, 0.75],
  ["L", "burberry-knight-05.jpg", 20, 0.75],
  ["L", "burberry-knight-02.jpg", 20, 0.75],
  ["L", "burberry-knight-03.jpg", 20, 0.75],
  ["L", "burberry-knight-04.jpg", 20, 0.75]
 ]
},
{
 "slug": "gemini-symbol-animation",
 "bg": "black",
 "label": "Gemini",
 "type": "Logo Animation",
 "source": "behance",
 "url": "https://www.behance.net/gallery/239178347/World-leading-Ai-Companies-Logo-Motion",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2025",
 "hero": [
  "c",
  "Qruvq4Aqis7",
  100,
  1.78
 ],
 "credits": [],
 "title": "Gemini 3 Symbol Animation",
 "contrib": "Motion Identity",
 "thumb": [
  "lv",
  "ccv_Qruvq4Aqis7.mp4",
  10.599,
  1.2,
  true
 ],
 "body": [
  "The point where the symbol’s corners meet extends outward, unfolding into the shape of a Möbius strip. This Möbius-like form represents Gemini’s sense of infinite possibility—a loop that is closed yet endlessly continuous. The moving circle is not just a dot but a strand of creative energy gliding along this infinite path. As it travels, it leaves behind a luminous trail each curve and sweep generates new surfaces and gradients that fold and overlap. These accumulated traces gradually converge into a single geometric form. When everything finally collapses into the star shaped figure, the duality, expansiveness, and creative potential of Gemini come together as one unified symbol. In essence, the animation visualizes the process of Gemini’s infinite potential materializing into creation itself.",
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/58803a239178347.69243b86679a5.png",
   48,
   1.78
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/ebe3ab239178347.69243b8669ef9.png",
   48,
   1.787
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/39f24c239178347.69243b8669101.png",
   48,
   1.785
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/d1ce0a239178347.69243b86687cf.png",
   48,
   1.788
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/a94afd239178347.69243b86681d9.png",
   48,
   1.784
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/4b6378239178347.69243b866a65e.png",
   48,
   1.783
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/dc4086239178347.69243b866b09a.png",
   48,
   1.783
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/802cc9239178347.69243b86696d4.png",
   48,
   1.784
  ]
 ]
},
{
 "slug": "openai-symbol-animation",
 "bg": "white",
 "label": "OpenAI",
 "type": "Logo Animation",
 "source": "behance",
 "url": "https://www.behance.net/gallery/239178347/World-leading-Ai-Companies-Logo-Motion",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2025",
 "hero": [
  "c",
  "C68iNwMQCPU",
  100,
  1.78
 ],
 "credits": [],
 "title": "OpenAI Symbol Animation",
 "contrib": "Motion Identity",
 "thumb": ["lv","ccv_C68iNwMQCPU.mp4",4,1.32],
 "body": [
  "Exploring the organic evolution of intelligence through motion. Inspired by OpenAI’s new symbol, this animation embodies the concept of Blossom—a seamless unfolding of ideas, technology, and creativity. From the logo animation to the web header and loading animation, each motion piece is crafted to reflect the dynamic and ever-growing nature of AI. Every frame is a step in the transformation, mirroring how intelligence expands and flourishes over time.",
  [
   "c",
   "SJ8gNHMun5_",
   96,
   1.78
  ],
  [
   "c",
   "DJx9rRk4-P-",
   96,
   1.78
  ]
 ]
},
{
 "slug": "grok-logo-animation",
 "bg": "black",
 "label": "Grok",
 "type": "Logo Animation",
 "source": "behance",
 "url": "https://www.behance.net/gallery/239178347/World-leading-Ai-Companies-Logo-Motion",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2025",
 "hero": [
  "c",
  "75DavzLt-Lt",
  100,
  1.5
 ],
 "credits": [],
 "title": "Grok Logo Animation",
 "contrib": "Motion Identity, 3D Motion",
 "thumb": [
  "lv",
  "ccv_75DavzLt-Lt.mp4",
  12
 ],
 "body": [
  "In line with Grok’s newly redesigned logo, inspired by the mystery and power of a black hole, this animation captures the essence of the brand’s identity. Just as a black hole symbolizes depth and gravitational pull, Grok3 represents an irresistible force in the AI universe. This black hole effect was created using Blender, pushing the limits of 3D motion to visualize the gravitational force at the heart of the brand. The animation reflects the dynamic energy and profound impact that define Grok3.",
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/1472f6239178347.692447a86aab3.png",
   51,
   1.781
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/55e20c239178347.692447a86980f.png",
   49,
   1.716
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/fc7b9c239178347.692447a869e70.png",
   31,
   1.493
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/b56a7d239178347.692447a86a455.png",
   37,
   1.783
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4d9b74239178347.692447a86934a.png",
   31,
   1.509
  ]
 ]
},
{
 "slug": "elago-iphone-17-silicone",
 "bg": "white",
 "type": "Product Film",
 "source": "behance",
 "url": "https://www.behance.net/gallery/238567963/Elago-Iphone-17-Series-Silicone-Case-Product-film",
 "title": "Elago iPhone 17 Silicone Case",
 "client": "elago",
 "owner": "elago",
 "year": "2025",
 "contrib": "Graphic Design, Motion Graphics, 3D Motion",
 "thumb": [
  "b",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808/2f7cf2238567963.Y3JvcCwyNjc0LDIwOTIsNTQyLDA.png"
 ],
 "hero": [
  "l",
  "elago17_silicone.web.mp4",
  100,
  1.778
 ],
 "body": [
  "Soft Touch, Every Color",
  "A product film for elago’s iPhone 17 series silicone case. It opens on a wall of colorways, then follows a single case as it floats through soft blue light, moving in close on the camera cutout, the raised buttons and the soft lining with its MagSafe ring. The phone slides in and charges wirelessly before the full color range tumbles through the frame. Modeled and rendered in Blender, finished in After Effects.",
  [
   "L",
   "elago17_silicone_0_5.jpg",
   96,
   1.778
  ],
  [
   "L",
   "elago17_silicone_3_5.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_silicone_7_0.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_silicone_12_4.jpg",
   96,
   1.778
  ],
  [
   "L",
   "elago17_silicone_15_1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_silicone_13_3.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_silicone_16_9.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_silicone_18_2.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_silicone_19_6.jpg",
   96,
   1.778
  ]
 ],
 "credits": [],
 "layoutIntro": true
},
{
 "slug": "elago-iphone-17-case",
 "bg": "white",
 "type": "Product Film",
 "source": "behance",
 "url": "https://www.behance.net/gallery/238568427/Elago-Iphone-17-Series-Case-Product-film",
 "title": "Elago iPhone 17 Case",
 "client": "elago",
 "owner": "elago",
 "year": "2025",
 "contrib": "Graphic Design, Motion Graphics, 3D Motion",
 "thumb": [
  "b",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808/51ba77238568427.Y3JvcCwyOTczLDIzMjYsNTg4LDA.png"
 ],
 "hero": [
  "l",
  "elago17_case.web.mp4",
  100,
  1.778
 ],
 "body": [
  "One Lineup, One Camera Language",
  "A product film introducing elago’s iPhone 17 series case lineup. Each case gets its own stage: a clean white case among soft spheres, a clear MagSafe case under cool light, a brown and black pair against warm terracotta, a textured beige case with an embossed logo, and a black case with a ring stand. Slow macro moves across camera rings, buttons and edges tie them together into one visual language, and the film closes on the full lineup side by side. Modeled and rendered in Blender, finished in After Effects.",
  [
   "L",
   "elago17_case_6_0.jpg",
   96,
   1.778
  ],
  [
   "L",
   "elago17_case_1_0.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_3_3.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_8_2.jpg",
   96,
   1.778
  ],
  [
   "L",
   "elago17_case_10_4.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_14_3.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_12_0.jpg",
   96,
   1.778
  ],
  [
   "L",
   "elago17_case_17_0.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_19_7.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_23_0.jpg",
   96,
   1.778
  ],
  [
   "L",
   "elago17_case_24_1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_25_6.jpg",
   48,
   1.778
  ],
  [
   "L",
   "elago17_case_28_5.jpg",
   96,
   1.778
  ]
 ],
 "credits": [],
 "layoutIntro": true
},
{
 "slug": "gentle-monster-tarx",
 "seamless": true,
 "bg": "white",
 "type": "Product Film",
 "source": "behance",
 "url": "https://www.behance.net/gallery/228220883/Gentle-Monster-Pocket-Collection-TARX",
 "title": "Gentle Monster Pocket Collection: TARX",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2025",
 "contrib": "Graphic Design, Motion Graphics, Art Direction",
 "thumb": [
  "b",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808/646cd3228220883.Y3JvcCwxNjk2LDEzMjcsMTE1MCww.png"
 ],
 "hero": [
  "v",
  "1093580364",
  100,
  1.5
 ],
 "body": [
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/6649d9228220883.684f81065fdaa.png",
   96,
   0.599
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/b89381228220883.684f8106602d4.png",
   96,
   0.923
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/3ff7a5228220883.684f810660a1a.png",
   96,
   0.96
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/80f3d5228220883.684f810661188.png",
   96,
   0.856
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9f2182228220883.684f810661872.png",
   96,
   3.014
  ]
 ],
 "credits": []
},
{
 "slug": "peaceminusone-highball",
 "seamless": true,
 "bg": "black",
 "type": "Product Film",
 "source": "behance",
 "url": "https://www.behance.net/gallery/227717235/Peaceminusone-Highball-Product-Film",
 "title": "Peaceminusone Highball",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2025",
 "contrib": "3D Motion, Product Film",
 "thumb": [
  "b",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808/8d8cc8227717235.Y3JvcCwyNTg4LDIwMjQsNjM0LDEwOA.png"
 ],
 "hero": [
  "v",
  "1091643565",
  100,
  1.778
 ],
 "credits": [],
 "body": [
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/d8c6ff227717235.6845e6703cd50.png",
   96,
   0.589
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/304073227717235.6845dfbf6b429.png",
   96,
   0.851
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/25bcb1227717235.6845e7a26737a.png",
   96,
   0.856
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/e296b9227717235.6845dfbf6ba4f.png",
   96,
   0.677
  ]
 ]
},
{
 "slug": "gradient-and-blur",
 "seamless": true,
 "bg": "black",
 "type": "Motion Graphics",
 "source": "behance",
 "url": "https://www.behance.net/gallery/226999681/Gradient-and-Blur",
 "title": "Gradient and Blur",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2025",
 "contrib": "Motion Graphics",
 "thumb": [
  "b",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808/8cbb99226999681.Y3JvcCwyNzYxLDIxNjAsNTQwLDA.png"
 ],
 "hero": [
  "v",
  "1088682165",
  100,
  1.778
 ],
 "credits": [],
 "body": [
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/a2d084226999681.68381d59a26eb.png",
   96,
   0.551
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/1e6a9d226999681.68381d59a2edc.png",
   96,
   0.717
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/41a130226999681.68381d59a1e55.png",
   96,
   0.68
  ],
  [
   "v",
   "1088681898",
   96,
   1.778
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/dca6b4226999681.68381d59a18b0.png",
   96,
   6.127
  ]
 ]
},
{
 "slug": "elago-iphone-16",
 "bg": "white",
 "type": "Product Film",
 "source": "behance",
 "url": "https://www.behance.net/gallery/224169085/Elago_Iphone-16pro-Case-Product-film",
 "title": "Elago iPhone 16 Pro Case",
 "client": "elago",
 "owner": "elago",
 "year": "2025",
 "contrib": "Graphic Design, Advertising, Product Design",
 "thumb": [
  "b",
  "https://mir-s3-cdn-cf.behance.net/projects/max_808/2e4fd6224169085.Y3JvcCwxMzgwLDEwODAsMjQ5LDA.png"
 ],
 "hero": [
  "c",
  "H26Pj_ManmC",
  100,
  1.78
 ],
 "body": [
  "Process",
  [
   "c",
   "7sV63fmM3zL",
   96,
   1.78
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1a80c1224169085.68069ad60334e.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d4e4c2224169085.68069ad604a46.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6bfebc224169085.68069ad60407a.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/df34bc224169085.68069ad604540.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7e6a34224169085.68069ad6066af.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0218f1224169085.68069ad605e99.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7c8472224169085.68069ad605953.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3edd3e224169085.68069ad6051d7.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0a6a0d224169085.68069ad603af6.png",
   48,
   1.777
  ],
  [
   "b",
   "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/614545224169085.68069ad606f7f.png",
   48,
   1.777
  ]
 ],
 "credits": []
},
{
 "slug": "furry-brands",
 "bg": "black",
 "type": "Creative Coding",
 "source": "behance",
 "url": "https://www.behance.net/gallery/185445689/Furry-Brands-Creative-Coding",
 "title": "Furry Brands",
 "client": "Personal Project",
 "owner": "Personal Project",
 "year": "2023",
 "contrib": "Creative Coding, Interaction Design",
 "thumb": [
  "L",
  "furry_fox_full.jpg"
 ],
 "hero": [
  "x",
  "lab/furry-brands.html",
  100,
  1.778
 ],
 "layoutIntro": true,
 "credits": [],
 "body": [
  "In Physical Touch, We Are Connected",
  "Furry Brands began with the idea that people ultimately connect through skinship. We deal with countless brands every day, yet we rarely get to touch them; even the products and services a company makes connect us to the brand only indirectly. This project gives brands a tactile surface. Hair was chosen as the medium because it leaves a visible trace of every touch, and five logos built on animal motifs, Fox Racing, BAPE, Playboy, PUMA and Maison Kitsuné, are rebuilt as living fur that parts under the cursor and slowly settles back. Move over the fur above to touch it, and click to switch brands. Built with p5.js, extending Jason Labbe’s “Interactive Logos” sketch.",
  [
   "L",
   "furry_fox_full.jpg",
   96,
   1.778
  ],
  [
   "L",
   "furry_fox_macro1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "furry_bape_macro1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "furry_bape_full.jpg",
   96,
   1.778
  ],
  [
   "L",
   "furry_playboy_full.jpg",
   96,
   1.778
  ],
  [
   "L",
   "furry_playboy_macro1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "furry_puma_macro1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "furry_puma_full.jpg",
   96,
   1.778
  ],
  [
   "L",
   "furry_maison_full.jpg",
   96,
   1.778
  ],
  [
   "L",
   "furry_maison_macro1.jpg",
   48,
   1.778
  ],
  [
   "L",
   "furry_puma_macro0.jpg",
   48,
   1.778
  ]
 ]
}
];
