import type { Lesson } from '@/content/types';
import type { L10n } from '@/lib/i18n-config';
import topic01Json from '@/content/g1-math/topic01.json';
import topic02Json from '@/content/g1-math/topic02.json';
import topic03Json from '@/content/g1-math/topic03.json';
import topic04Json from '@/content/g1-math/topic04.json';
import topic05Json from '@/content/g1-math/topic05.json';
import topic06Json from '@/content/g1-math/topic06.json';
import topic07Json from '@/content/g1-math/topic07.json';
import topic08Json from '@/content/g1-math/topic08.json';
import topic09Json from '@/content/g1-math/topic09.json';
import topic10Json from '@/content/g1-math/topic10.json';
import topic11Json from '@/content/g1-math/topic11.json';
import topic12Json from '@/content/g1-math/topic12.json';
import topic13Json from '@/content/g1-math/topic13.json';
import topic14Json from '@/content/g1-math/topic14.json';
import topic15Json from '@/content/g1-math/topic15.json';
import topic16Json from '@/content/g1-math/topic16.json';
import topic17Json from '@/content/g1-math/topic17.json';
import topic18Json from '@/content/g1-math/topic18.json';
import topic19Json from '@/content/g1-math/topic19.json';
import topic20Json from '@/content/g1-math/topic20.json';
import topic21Json from '@/content/g1-math/topic21.json';
import topic22Json from '@/content/g1-math/topic22.json';
import topic23Json from '@/content/g1-math/topic23.json';
import topic24Json from '@/content/g1-math/topic24.json';
import topic25Json from '@/content/g1-math/topic25.json';
import topic26Json from '@/content/g1-math/topic26.json';
import topic27Json from '@/content/g1-math/topic27.json';
import topic28Json from '@/content/g1-math/topic28.json';
import topic29Json from '@/content/g1-math/topic29.json';
import topic30Json from '@/content/g1-math/topic30.json';
import topic31Json from '@/content/g1-math/topic31.json';
import topic32Json from '@/content/g1-math/topic32.json';
import topic33Json from '@/content/g1-math/topic33.json';
import topic34Json from '@/content/g1-math/topic34.json';
import topic35Json from '@/content/g1-math/topic35.json';
import topic36Json from '@/content/g1-math/topic36.json';
import topic37Json from '@/content/g1-math/topic37.json';
import topic38Json from '@/content/g1-math/topic38.json';
import topic39Json from '@/content/g1-math/topic39.json';
import topic40Json from '@/content/g1-math/topic40.json';
import topic41Json from '@/content/g1-math/topic41.json';
import topic42Json from '@/content/g1-math/topic42.json';
import topic43Json from '@/content/g1-math/topic43.json';
import topic44Json from '@/content/g1-math/topic44.json';
import topic45Json from '@/content/g1-math/topic45.json';
import topic46Json from '@/content/g1-math/topic46.json';
import topic47Json from '@/content/g1-math/topic47.json';
import topic48Json from '@/content/g1-math/topic48.json';
import topic49Json from '@/content/g1-math/topic49.json';
import topic50Json from '@/content/g1-math/topic50.json';
import topic51Json from '@/content/g1-math/topic51.json';
import topic52Json from '@/content/g1-math/topic52.json';
import topic53Json from '@/content/g1-math/topic53.json';
import topic54Json from '@/content/g1-math/topic54.json';
import topic55Json from '@/content/g1-math/topic55.json';
import topic56Json from '@/content/g1-math/topic56.json';
import topic57Json from '@/content/g1-math/topic57.json';
import topic58Json from '@/content/g1-math/topic58.json';
import topic59Json from '@/content/g1-math/topic59.json';
import topic60Json from '@/content/g1-math/topic60.json';
import topic61Json from '@/content/g1-math/topic61.json';
import topic62Json from '@/content/g1-math/topic62.json';
import topic63Json from '@/content/g1-math/topic63.json';
import topic64Json from '@/content/g1-math/topic64.json';
import topic65Json from '@/content/g1-math/topic65.json';
import topic66Json from '@/content/g1-math/topic66.json';
import topic67Json from '@/content/g1-math/topic67.json';
import topic68Json from '@/content/g1-math/topic68.json';
import topic69Json from '@/content/g1-math/topic69.json';
import topic70Json from '@/content/g1-math/topic70.json';
import topic71Json from '@/content/g1-math/topic71.json';
import topic72Json from '@/content/g1-math/topic72.json';
import topic73Json from '@/content/g1-math/topic73.json';
import topic75Json from '@/content/g1-math/topic75.json';
import topic76Json from '@/content/g1-math/topic76.json';
import topic77Json from '@/content/g1-math/topic77.json';
import topic78Json from '@/content/g1-math/topic78.json';
import topic79Json from '@/content/g1-math/topic79.json';
import topic80Json from '@/content/g1-math/topic80.json';
import topic81Json from '@/content/g1-math/topic81.json';
import topic82Json from '@/content/g1-math/topic82.json';
import topic83Json from '@/content/g1-math/topic83.json';
import topic84Json from '@/content/g1-math/topic84.json';
import topic85Json from '@/content/g1-math/topic85.json';
import topic86Json from '@/content/g1-math/topic86.json';
import topic87Json from '@/content/g1-math/topic87.json';
import topic88Json from '@/content/g1-math/topic88.json';
import topic89Json from '@/content/g1-math/topic89.json';
import topic90Json from '@/content/g1-math/topic90.json';
import topic91Json from '@/content/g1-math/topic91.json';
import topic92Json from '@/content/g1-math/topic92.json';
import topic93Json from '@/content/g1-math/topic93.json';
import topic94Json from '@/content/g1-math/topic94.json';
import topic95Json from '@/content/g1-math/topic95.json';
import topic96Json from '@/content/g1-math/topic96.json';
import topic97Json from '@/content/g1-math/topic97.json';
import topic98Json from '@/content/g1-math/topic98.json';
import topic99Json from '@/content/g1-math/topic99.json';
import topic100Json from '@/content/g1-math/topic100.json';
import topic101Json from '@/content/g1-math/topic101.json';
import topic102Json from '@/content/g1-math/topic102.json';
import topic103Json from '@/content/g1-math/topic103.json';
import topic104Json from '@/content/g1-math/topic104.json';
import topic105Json from '@/content/g1-math/topic105.json';
import topic106Json from '@/content/g1-math/topic106.json';
import topic107Json from '@/content/g1-math/topic107.json';
import topic108Json from '@/content/g1-math/topic108.json';
import topic109Json from '@/content/g1-math/topic109.json';
import topic110Json from '@/content/g1-math/topic110.json';
import topic111Json from '@/content/g1-math/topic111.json';
import topic112Json from '@/content/g1-math/topic112.json';
import topic113Json from '@/content/g1-math/topic113.json';
import topic114Json from '@/content/g1-math/topic114.json';
import topic115Json from '@/content/g1-math/topic115.json';
import topic116Json from '@/content/g1-math/topic116.json';
import topic117Json from '@/content/g1-math/topic117.json';
import topic118Json from '@/content/g1-math/topic118.json';
import topic119Json from '@/content/g1-math/topic119.json';
import topic120Json from '@/content/g1-math/topic120.json';
import topic121Json from '@/content/g1-math/topic121.json';
import topic122Json from '@/content/g1-math/topic122.json';
import topic123Json from '@/content/g1-math/topic123.json';
import topic124Json from '@/content/g1-math/topic124.json';
import topic125Json from '@/content/g1-math/topic125.json';
import topic126Json from '@/content/g1-math/topic126.json';
import topic127Json from '@/content/g1-math/topic127.json';
import topic128Json from '@/content/g1-math/topic128.json';
import topic129Json from '@/content/g1-math/topic129.json';
import topic130Json from '@/content/g1-math/topic130.json';
import topic131Json from '@/content/g1-math/topic131.json';
import topic132Json from '@/content/g1-math/topic132.json';
import topic133Json from '@/content/g1-math/topic133.json';
import topic134Json from '@/content/g1-math/topic134.json';
import topic135Json from '@/content/g1-math/topic135.json';
import topic136Json from '@/content/g1-math/topic136.json';
import topic137Json from '@/content/g1-math/topic137.json';
import topic138Json from '@/content/g1-math/topic138.json';
import topic139Json from '@/content/g1-math/topic139.json';
import topic140Json from '@/content/g1-math/topic140.json';
import topic141Json from '@/content/g1-math/topic141.json';
import topic142Json from '@/content/g1-math/topic142.json';
import topic143Json from '@/content/g1-math/topic143.json';
import topic144Json from '@/content/g1-math/topic144.json';
import review01Json from '@/content/g1-math/review01.json';
import review02Json from '@/content/g1-math/review02.json';
import review03Json from '@/content/g1-math/review03.json';
import review04Json from '@/content/g1-math/review04.json';
import onaReview01Json from '@/content/g1-ona/review01.json';
import onaReview02Json from '@/content/g1-ona/review02.json';
import { G1_MATH_TOPICS, getTopic } from '@/content/g1-math/topics';
import onaTopic01Json from '@/content/g1-ona/topic01.json';
import onaTopic02Json from '@/content/g1-ona/topic02.json';
import onaTopic03Json from '@/content/g1-ona/topic03.json';
import onaTopic04Json from '@/content/g1-ona/topic04.json';
import onaTopic05Json from '@/content/g1-ona/topic05.json';
import onaTopic06Json from '@/content/g1-ona/topic06.json';
import onaTopic07Json from '@/content/g1-ona/topic07.json';
import onaTopic08Json from '@/content/g1-ona/topic08.json';
import onaTopic09Json from '@/content/g1-ona/topic09.json';
import onaTopic10Json from '@/content/g1-ona/topic10.json';
import onaTopic11Json from '@/content/g1-ona/topic11.json';
import onaTopic12Json from '@/content/g1-ona/topic12.json';
import onaTopic13Json from '@/content/g1-ona/topic13.json';
import onaTopic14Json from '@/content/g1-ona/topic14.json';
import onaTopic15Json from '@/content/g1-ona/topic15.json';
import onaTopic16Json from '@/content/g1-ona/topic16.json';
import onaTopic17Json from '@/content/g1-ona/topic17.json';
import onaTopic18Json from '@/content/g1-ona/topic18.json';
import onaTopic19Json from '@/content/g1-ona/topic19.json';
import onaTopic20Json from '@/content/g1-ona/topic20.json';
import onaTopic21Json from '@/content/g1-ona/topic21.json';
import onaTopic22Json from '@/content/g1-ona/topic22.json';
import onaTopic23Json from '@/content/g1-ona/topic23.json';
import onaTopic24Json from '@/content/g1-ona/topic24.json';
import onaTopic25Json from '@/content/g1-ona/topic25.json';
import onaTopic26Json from '@/content/g1-ona/topic26.json';
import onaTopic27Json from '@/content/g1-ona/topic27.json';
import onaTopic28Json from '@/content/g1-ona/topic28.json';
import onaTopic29Json from '@/content/g1-ona/topic29.json';
import onaTopic30Json from '@/content/g1-ona/topic30.json';
import onaTopic31Json from '@/content/g1-ona/topic31.json';
import onaTopic32Json from '@/content/g1-ona/topic32.json';
import onaTopic33Json from '@/content/g1-ona/topic33.json';
import onaTopic34Json from '@/content/g1-ona/topic34.json';
import onaTopic35Json from '@/content/g1-ona/topic35.json';
import onaTopic36Json from '@/content/g1-ona/topic36.json';
import onaTopic37Json from '@/content/g1-ona/topic37.json';
import onaTopic38Json from '@/content/g1-ona/topic38.json';
import onaTopic39Json from '@/content/g1-ona/topic39.json';
import onaTopic40Json from '@/content/g1-ona/topic40.json';
import onaTopic41Json from '@/content/g1-ona/topic41.json';
import onaTopic42Json from '@/content/g1-ona/topic42.json';
import onaTopic43Json from '@/content/g1-ona/topic43.json';
import onaTopic44Json from '@/content/g1-ona/topic44.json';
import onaTopic45Json from '@/content/g1-ona/topic45.json';
import onaTopic46Json from '@/content/g1-ona/topic46.json';
import onaTopic47Json from '@/content/g1-ona/topic47.json';
import onaTopic48Json from '@/content/g1-ona/topic48.json';
import onaTopic49Json from '@/content/g1-ona/topic49.json';
import onaTopic50Json from '@/content/g1-ona/topic50.json';
import onaTopic51Json from '@/content/g1-ona/topic51.json';
import onaTopic52Json from '@/content/g1-ona/topic52.json';
import onaTopic53Json from '@/content/g1-ona/topic53.json';
import onaTopic54Json from '@/content/g1-ona/topic54.json';
import onaTopic55Json from '@/content/g1-ona/topic55.json';
import onaTopic56Json from '@/content/g1-ona/topic56.json';
import { G1_ONA_TOPICS, getOnaTopic } from '@/content/g1-ona/topics';
import oqishTopic01Json from '@/content/g1-oqish/topic01.json';
import oqishTopic02Json from '@/content/g1-oqish/topic02.json';
import oqishTopic03Json from '@/content/g1-oqish/topic03.json';
import oqishTopic04Json from '@/content/g1-oqish/topic04.json';
import oqishTopic05Json from '@/content/g1-oqish/topic05.json';
import oqishTopic06Json from '@/content/g1-oqish/topic06.json';
import oqishTopic07Json from '@/content/g1-oqish/topic07.json';
import oqishTopic08Json from '@/content/g1-oqish/topic08.json';
import oqishTopic09Json from '@/content/g1-oqish/topic09.json';
import oqishTopic10Json from '@/content/g1-oqish/topic10.json';
import oqishTopic11Json from '@/content/g1-oqish/topic11.json';
import oqishTopic12Json from '@/content/g1-oqish/topic12.json';
import oqishTopic13Json from '@/content/g1-oqish/topic13.json';
import oqishTopic14Json from '@/content/g1-oqish/topic14.json';
import oqishTopic15Json from '@/content/g1-oqish/topic15.json';
import oqishTopic16Json from '@/content/g1-oqish/topic16.json';
import oqishTopic17Json from '@/content/g1-oqish/topic17.json';
import oqishTopic18Json from '@/content/g1-oqish/topic18.json';
import oqishTopic19Json from '@/content/g1-oqish/topic19.json';
import oqishTopic20Json from '@/content/g1-oqish/topic20.json';
import oqishTopic21Json from '@/content/g1-oqish/topic21.json';
import oqishTopic22Json from '@/content/g1-oqish/topic22.json';
import oqishTopic23Json from '@/content/g1-oqish/topic23.json';
import oqishTopic24Json from '@/content/g1-oqish/topic24.json';
import oqishTopic25Json from '@/content/g1-oqish/topic25.json';
import oqishTopic26Json from '@/content/g1-oqish/topic26.json';
import oqishTopic27Json from '@/content/g1-oqish/topic27.json';
import oqishTopic28Json from '@/content/g1-oqish/topic28.json';
import oqishTopic29Json from '@/content/g1-oqish/topic29.json';
import oqishTopic30Json from '@/content/g1-oqish/topic30.json';
import oqishTopic31Json from '@/content/g1-oqish/topic31.json';
import oqishTopic32Json from '@/content/g1-oqish/topic32.json';
import oqishTopic33Json from '@/content/g1-oqish/topic33.json';
import oqishTopic34Json from '@/content/g1-oqish/topic34.json';
import oqishTopic35Json from '@/content/g1-oqish/topic35.json';
import oqishTopic36Json from '@/content/g1-oqish/topic36.json';
import oqishTopic37Json from '@/content/g1-oqish/topic37.json';
import oqishTopic38Json from '@/content/g1-oqish/topic38.json';
import oqishTopic39Json from '@/content/g1-oqish/topic39.json';
import oqishTopic40Json from '@/content/g1-oqish/topic40.json';
import oqishTopic41Json from '@/content/g1-oqish/topic41.json';
import oqishTopic42Json from '@/content/g1-oqish/topic42.json';
import oqishTopic43Json from '@/content/g1-oqish/topic43.json';
import oqishTopic44Json from '@/content/g1-oqish/topic44.json';
import oqishTopic45Json from '@/content/g1-oqish/topic45.json';
import oqishTopic46Json from '@/content/g1-oqish/topic46.json';
import oqishTopic47Json from '@/content/g1-oqish/topic47.json';
import oqishTopic48Json from '@/content/g1-oqish/topic48.json';
import oqishTopic49Json from '@/content/g1-oqish/topic49.json';
import oqishTopic50Json from '@/content/g1-oqish/topic50.json';
import oqishTopic51Json from '@/content/g1-oqish/topic51.json';
import oqishTopic52Json from '@/content/g1-oqish/topic52.json';
import oqishTopic53Json from '@/content/g1-oqish/topic53.json';
import oqishTopic54Json from '@/content/g1-oqish/topic54.json';
import oqishTopic55Json from '@/content/g1-oqish/topic55.json';
import oqishTopic56Json from '@/content/g1-oqish/topic56.json';
import oqishTopic57Json from '@/content/g1-oqish/topic57.json';
import oqishTopic58Json from '@/content/g1-oqish/topic58.json';
import oqishTopic59Json from '@/content/g1-oqish/topic59.json';
import oqishTopic60Json from '@/content/g1-oqish/topic60.json';
import oqishTopic61Json from '@/content/g1-oqish/topic61.json';
import oqishTopic62Json from '@/content/g1-oqish/topic62.json';
import oqishTopic63Json from '@/content/g1-oqish/topic63.json';
import oqishTopic64Json from '@/content/g1-oqish/topic64.json';
import tabiiyTopic01Json from '@/content/g1-tabiiy/topic01.json';
import tabiiyTopic02Json from '@/content/g1-tabiiy/topic02.json';
import tabiiyTopic03Json from '@/content/g1-tabiiy/topic03.json';
import tabiiyTopic04Json from '@/content/g1-tabiiy/topic04.json';
import tabiiyTopic05Json from '@/content/g1-tabiiy/topic05.json';
import tabiiyTopic06Json from '@/content/g1-tabiiy/topic06.json';
import tabiiyTopic07Json from '@/content/g1-tabiiy/topic07.json';
import tabiiyTopic08Json from '@/content/g1-tabiiy/topic08.json';
import tabiiyTopic09Json from '@/content/g1-tabiiy/topic09.json';
import tabiiyTopic10Json from '@/content/g1-tabiiy/topic10.json';
import tabiiyTopic11Json from '@/content/g1-tabiiy/topic11.json';
import tabiiyTopic12Json from '@/content/g1-tabiiy/topic12.json';
import tabiiyTopic13Json from '@/content/g1-tabiiy/topic13.json';
import tabiiyTopic14Json from '@/content/g1-tabiiy/topic14.json';
import tabiiyTopic15Json from '@/content/g1-tabiiy/topic15.json';
import tabiiyTopic16Json from '@/content/g1-tabiiy/topic16.json';
import tabiiyTopic17Json from '@/content/g1-tabiiy/topic17.json';
import tabiiyTopic18Json from '@/content/g1-tabiiy/topic18.json';
import tabiiyTopic19Json from '@/content/g1-tabiiy/topic19.json';
import { G1_TABIIY_TOPICS, getTabiiyTopic } from '@/content/g1-tabiiy/topics';
import alifbeTopic01Json from '@/content/g1-alifbe/topic01.json';
import alifbeTopic02Json from '@/content/g1-alifbe/topic02.json';
import alifbeTopic03Json from '@/content/g1-alifbe/topic03.json';
import alifbeTopic04Json from '@/content/g1-alifbe/topic04.json';
import alifbeTopic05Json from '@/content/g1-alifbe/topic05.json';
import alifbeTopic06Json from '@/content/g1-alifbe/topic06.json';
import alifbeTopic07Json from '@/content/g1-alifbe/topic07.json';
import alifbeTopic08Json from '@/content/g1-alifbe/topic08.json';
import alifbeTopic09Json from '@/content/g1-alifbe/topic09.json';
import alifbeTopic10Json from '@/content/g1-alifbe/topic10.json';
import alifbeTopic11Json from '@/content/g1-alifbe/topic11.json';
import alifbeTopic12Json from '@/content/g1-alifbe/topic12.json';
import alifbeTopic13Json from '@/content/g1-alifbe/topic13.json';
import alifbeTopic14Json from '@/content/g1-alifbe/topic14.json';
import alifbeTopic15Json from '@/content/g1-alifbe/topic15.json';
import alifbeTopic16Json from '@/content/g1-alifbe/topic16.json';
import alifbeTopic17Json from '@/content/g1-alifbe/topic17.json';
import alifbeTopic18Json from '@/content/g1-alifbe/topic18.json';
import alifbeTopic19Json from '@/content/g1-alifbe/topic19.json';
import alifbeTopic20Json from '@/content/g1-alifbe/topic20.json';
import alifbeTopic21Json from '@/content/g1-alifbe/topic21.json';
import alifbeTopic22Json from '@/content/g1-alifbe/topic22.json';
import alifbeTopic23Json from '@/content/g1-alifbe/topic23.json';
import alifbeTopic24Json from '@/content/g1-alifbe/topic24.json';
import alifbeTopic25Json from '@/content/g1-alifbe/topic25.json';
import alifbeTopic26Json from '@/content/g1-alifbe/topic26.json';
import alifbeTopic27Json from '@/content/g1-alifbe/topic27.json';
import alifbeTopic28Json from '@/content/g1-alifbe/topic28.json';
import alifbeTopic29Json from '@/content/g1-alifbe/topic29.json';
import alifbeTopic30Json from '@/content/g1-alifbe/topic30.json';
import alifbeTopic31Json from '@/content/g1-alifbe/topic31.json';
import alifbeTopic32Json from '@/content/g1-alifbe/topic32.json';
import alifbeTopic33Json from '@/content/g1-alifbe/topic33.json';
import alifbeTopic34Json from '@/content/g1-alifbe/topic34.json';
import alifbeTopic35Json from '@/content/g1-alifbe/topic35.json';
import alifbeTopic36Json from '@/content/g1-alifbe/topic36.json';
import alifbeTopic37Json from '@/content/g1-alifbe/topic37.json';
import alifbeTopic38Json from '@/content/g1-alifbe/topic38.json';
import alifbeTopic39Json from '@/content/g1-alifbe/topic39.json';
import alifbeTopic40Json from '@/content/g1-alifbe/topic40.json';
import alifbeTopic41Json from '@/content/g1-alifbe/topic41.json';
import alifbeTopic42Json from '@/content/g1-alifbe/topic42.json';
import alifbeTopic43Json from '@/content/g1-alifbe/topic43.json';
import alifbeTopic44Json from '@/content/g1-alifbe/topic44.json';
import alifbeTopic45Json from '@/content/g1-alifbe/topic45.json';
import alifbeTopic46Json from '@/content/g1-alifbe/topic46.json';
import alifbeTopic47Json from '@/content/g1-alifbe/topic47.json';
import alifbeTopic48Json from '@/content/g1-alifbe/topic48.json';
import alifbeTopic49Json from '@/content/g1-alifbe/topic49.json';
import alifbeTopic50Json from '@/content/g1-alifbe/topic50.json';
import alifbeTopic51Json from '@/content/g1-alifbe/topic51.json';
import alifbeTopic52Json from '@/content/g1-alifbe/topic52.json';
import alifbeTopic53Json from '@/content/g1-alifbe/topic53.json';
import alifbeTopic54Json from '@/content/g1-alifbe/topic54.json';
import alifbeTopic55Json from '@/content/g1-alifbe/topic55.json';
import alifbeTopic56Json from '@/content/g1-alifbe/topic56.json';
import alifbeTopic57Json from '@/content/g1-alifbe/topic57.json';
import alifbeTopic58Json from '@/content/g1-alifbe/topic58.json';
import alifbeTopic59Json from '@/content/g1-alifbe/topic59.json';
import alifbeTopic60Json from '@/content/g1-alifbe/topic60.json';
import alifbeTopic61Json from '@/content/g1-alifbe/topic61.json';
import alifbeTopic62Json from '@/content/g1-alifbe/topic62.json';
import alifbeTopic63Json from '@/content/g1-alifbe/topic63.json';
import alifbeTopic64Json from '@/content/g1-alifbe/topic64.json';
import infoTopic01Json from '@/content/g1-informatika/topic01.json';
import infoTopic02Json from '@/content/g1-informatika/topic02.json';
import infoTopic03Json from '@/content/g1-informatika/topic03.json';
import infoTopic04Json from '@/content/g1-informatika/topic04.json';
import infoTopic05Json from '@/content/g1-informatika/topic05.json';
import infoTopic06Json from '@/content/g1-informatika/topic06.json';
import infoTopic07Json from '@/content/g1-informatika/topic07.json';
import infoTopic08Json from '@/content/g1-informatika/topic08.json';
import infoTopic09Json from '@/content/g1-informatika/topic09.json';
import infoTopic10Json from '@/content/g1-informatika/topic10.json';
import infoTopic11Json from '@/content/g1-informatika/topic11.json';
import infoTopic12Json from '@/content/g1-informatika/topic12.json';
import infoTopic13Json from '@/content/g1-informatika/topic13.json';
import infoTopic14Json from '@/content/g1-informatika/topic14.json';
import infoTopic15Json from '@/content/g1-informatika/topic15.json';
import infoTopic16Json from '@/content/g1-informatika/topic16.json';
import infoTopic17Json from '@/content/g1-informatika/topic17.json';
import infoTopic18Json from '@/content/g1-informatika/topic18.json';
import infoTopic19Json from '@/content/g1-informatika/topic19.json';
import infoTopic20Json from '@/content/g1-informatika/topic20.json';
import infoTopic21Json from '@/content/g1-informatika/topic21.json';
import infoTopic22Json from '@/content/g1-informatika/topic22.json';
import infoTopic23Json from '@/content/g1-informatika/topic23.json';
import infoTopic24Json from '@/content/g1-informatika/topic24.json';
import infoTopic25Json from '@/content/g1-informatika/topic25.json';
import infoTopic26Json from '@/content/g1-informatika/topic26.json';
import infoTopic27Json from '@/content/g1-informatika/topic27.json';
import infoTopic28Json from '@/content/g1-informatika/topic28.json';
import infoTopic29Json from '@/content/g1-informatika/topic29.json';
import infoTopic30Json from '@/content/g1-informatika/topic30.json';
import infoTopic31Json from '@/content/g1-informatika/topic31.json';
import infoTopic32Json from '@/content/g1-informatika/topic32.json';
import infoTopic33Json from '@/content/g1-informatika/topic33.json';
import { G1_ALIFBE_TOPICS, getAlifbeTopic } from '@/content/g1-alifbe/topics';
import inglizTopic01Json from '@/content/g1-ingliz/topic01.json';
import inglizTopic02Json from '@/content/g1-ingliz/topic02.json';
import inglizTopic03Json from '@/content/g1-ingliz/topic03.json';
import inglizTopic04Json from '@/content/g1-ingliz/topic04.json';
import inglizTopic05Json from '@/content/g1-ingliz/topic05.json';
import inglizTopic06Json from '@/content/g1-ingliz/topic06.json';
import inglizTopic07Json from '@/content/g1-ingliz/topic07.json';
import inglizTopic08Json from '@/content/g1-ingliz/topic08.json';
import inglizTopic09Json from '@/content/g1-ingliz/topic09.json';
import inglizTopic10Json from '@/content/g1-ingliz/topic10.json';
import inglizTopic11Json from '@/content/g1-ingliz/topic11.json';
import inglizTopic12Json from '@/content/g1-ingliz/topic12.json';
import inglizTopic13Json from '@/content/g1-ingliz/topic13.json';
import inglizTopic14Json from '@/content/g1-ingliz/topic14.json';
import inglizTopic15Json from '@/content/g1-ingliz/topic15.json';
import inglizTopic16Json from '@/content/g1-ingliz/topic16.json';
import inglizTopic17Json from '@/content/g1-ingliz/topic17.json';
import inglizTopic18Json from '@/content/g1-ingliz/topic18.json';
import inglizTopic19Json from '@/content/g1-ingliz/topic19.json';
import inglizTopic20Json from '@/content/g1-ingliz/topic20.json';
import inglizTopic21Json from '@/content/g1-ingliz/topic21.json';
import inglizTopic22Json from '@/content/g1-ingliz/topic22.json';
import inglizTopic23Json from '@/content/g1-ingliz/topic23.json';
import inglizTopic24Json from '@/content/g1-ingliz/topic24.json';
import inglizTopic25Json from '@/content/g1-ingliz/topic25.json';
import inglizTopic26Json from '@/content/g1-ingliz/topic26.json';
import inglizTopic27Json from '@/content/g1-ingliz/topic27.json';
import inglizTopic28Json from '@/content/g1-ingliz/topic28.json';
import inglizTopic29Json from '@/content/g1-ingliz/topic29.json';
import inglizTopic30Json from '@/content/g1-ingliz/topic30.json';
import inglizTopic31Json from '@/content/g1-ingliz/topic31.json';
import inglizTopic32Json from '@/content/g1-ingliz/topic32.json';
import inglizTopic33Json from '@/content/g1-ingliz/topic33.json';
import inglizTopic34Json from '@/content/g1-ingliz/topic34.json';
import inglizTopic35Json from '@/content/g1-ingliz/topic35.json';
import inglizTopic36Json from '@/content/g1-ingliz/topic36.json';
import inglizTopic37Json from '@/content/g1-ingliz/topic37.json';
import inglizTopic38Json from '@/content/g1-ingliz/topic38.json';
import inglizTopic39Json from '@/content/g1-ingliz/topic39.json';
import inglizTopic40Json from '@/content/g1-ingliz/topic40.json';
import inglizTopic41Json from '@/content/g1-ingliz/topic41.json';
import inglizTopic42Json from '@/content/g1-ingliz/topic42.json';
import inglizTopic43Json from '@/content/g1-ingliz/topic43.json';
import inglizTopic44Json from '@/content/g1-ingliz/topic44.json';
import inglizTopic45Json from '@/content/g1-ingliz/topic45.json';
import inglizTopic46Json from '@/content/g1-ingliz/topic46.json';
import inglizTopic47Json from '@/content/g1-ingliz/topic47.json';
import inglizTopic48Json from '@/content/g1-ingliz/topic48.json';
import inglizTopic49Json from '@/content/g1-ingliz/topic49.json';
import inglizTopic50Json from '@/content/g1-ingliz/topic50.json';
import inglizTopic51Json from '@/content/g1-ingliz/topic51.json';
import inglizTopic52Json from '@/content/g1-ingliz/topic52.json';
import inglizTopic53Json from '@/content/g1-ingliz/topic53.json';
import inglizTopic54Json from '@/content/g1-ingliz/topic54.json';
import inglizTopic55Json from '@/content/g1-ingliz/topic55.json';
import inglizTopic56Json from '@/content/g1-ingliz/topic56.json';
import inglizTopic57Json from '@/content/g1-ingliz/topic57.json';
import inglizTopic58Json from '@/content/g1-ingliz/topic58.json';
import inglizTopic59Json from '@/content/g1-ingliz/topic59.json';
import inglizTopic60Json from '@/content/g1-ingliz/topic60.json';
import tarbiyaTopic01Json from '@/content/g1-tarbiya/topic01.json';
import tarbiyaTopic02Json from '@/content/g1-tarbiya/topic02.json';
import tarbiyaTopic03Json from '@/content/g1-tarbiya/topic03.json';
import tarbiyaTopic04Json from '@/content/g1-tarbiya/topic04.json';
import tarbiyaTopic05Json from '@/content/g1-tarbiya/topic05.json';
import tarbiyaTopic06Json from '@/content/g1-tarbiya/topic06.json';
import tarbiyaTopic07Json from '@/content/g1-tarbiya/topic07.json';
import tarbiyaTopic08Json from '@/content/g1-tarbiya/topic08.json';
import tarbiyaTopic09Json from '@/content/g1-tarbiya/topic09.json';
import tarbiyaTopic10Json from '@/content/g1-tarbiya/topic10.json';
import tarbiyaTopic11Json from '@/content/g1-tarbiya/topic11.json';
import tarbiyaTopic12Json from '@/content/g1-tarbiya/topic12.json';
import tarbiyaTopic13Json from '@/content/g1-tarbiya/topic13.json';
import tarbiyaTopic14Json from '@/content/g1-tarbiya/topic14.json';
import tarbiyaTopic15Json from '@/content/g1-tarbiya/topic15.json';
import tarbiyaTopic16Json from '@/content/g1-tarbiya/topic16.json';
import tarbiyaTopic17Json from '@/content/g1-tarbiya/topic17.json';
import tarbiyaTopic18Json from '@/content/g1-tarbiya/topic18.json';
import tarbiyaTopic19Json from '@/content/g1-tarbiya/topic19.json';
import tarbiyaTopic20Json from '@/content/g1-tarbiya/topic20.json';
import tarbiyaTopic21Json from '@/content/g1-tarbiya/topic21.json';
import artTopic01Json from '@/content/g1-art/topic01.json';
import artTopic02Json from '@/content/g1-art/topic02.json';
import artTopic03Json from '@/content/g1-art/topic03.json';
import artTopic04Json from '@/content/g1-art/topic04.json';
import artTopic05Json from '@/content/g1-art/topic05.json';
import artTopic06Json from '@/content/g1-art/topic06.json';
import artTopic07Json from '@/content/g1-art/topic07.json';
import artTopic08Json from '@/content/g1-art/topic08.json';
import artTopic09Json from '@/content/g1-art/topic09.json';
import artTopic10Json from '@/content/g1-art/topic10.json';
import artTopic11Json from '@/content/g1-art/topic11.json';
import artTopic12Json from '@/content/g1-art/topic12.json';
import artTopic13Json from '@/content/g1-art/topic13.json';
import artTopic14Json from '@/content/g1-art/topic14.json';
import artTopic15Json from '@/content/g1-art/topic15.json';
import artTopic16Json from '@/content/g1-art/topic16.json';
import artTopic17Json from '@/content/g1-art/topic17.json';
import artTopic18Json from '@/content/g1-art/topic18.json';
import artTopic19Json from '@/content/g1-art/topic19.json';
import artTopic20Json from '@/content/g1-art/topic20.json';
import artTopic21Json from '@/content/g1-art/topic21.json';
import artTopic22Json from '@/content/g1-art/topic22.json';
import artTopic23Json from '@/content/g1-art/topic23.json';
import artTopic24Json from '@/content/g1-art/topic24.json';
import artTopic25Json from '@/content/g1-art/topic25.json';
import artTopic26Json from '@/content/g1-art/topic26.json';
import artTopic27Json from '@/content/g1-art/topic27.json';
import artTopic28Json from '@/content/g1-art/topic28.json';
import artTopic29Json from '@/content/g1-art/topic29.json';
import artTopic30Json from '@/content/g1-art/topic30.json';
import artTopic31Json from '@/content/g1-art/topic31.json';
import artTopic32Json from '@/content/g1-art/topic32.json';
import artTopic33Json from '@/content/g1-art/topic33.json';
import artTopic34Json from '@/content/g1-art/topic34.json';
import artTopic35Json from '@/content/g1-art/topic35.json';
import artTopic36Json from '@/content/g1-art/topic36.json';
import texTopic01Json from '@/content/g1-tex/topic01.json';
import texTopic02Json from '@/content/g1-tex/topic02.json';
import texTopic03Json from '@/content/g1-tex/topic03.json';
import texTopic04Json from '@/content/g1-tex/topic04.json';
import texTopic05Json from '@/content/g1-tex/topic05.json';
import texTopic06Json from '@/content/g1-tex/topic06.json';
import texTopic07Json from '@/content/g1-tex/topic07.json';
import texTopic08Json from '@/content/g1-tex/topic08.json';
import texTopic09Json from '@/content/g1-tex/topic09.json';
import texTopic10Json from '@/content/g1-tex/topic10.json';
import texTopic11Json from '@/content/g1-tex/topic11.json';
import texTopic12Json from '@/content/g1-tex/topic12.json';
import texTopic13Json from '@/content/g1-tex/topic13.json';
import texTopic14Json from '@/content/g1-tex/topic14.json';
import texTopic15Json from '@/content/g1-tex/topic15.json';
import texTopic16Json from '@/content/g1-tex/topic16.json';
import texTopic17Json from '@/content/g1-tex/topic17.json';
import texTopic18Json from '@/content/g1-tex/topic18.json';
import texTopic19Json from '@/content/g1-tex/topic19.json';
import texTopic20Json from '@/content/g1-tex/topic20.json';
import texTopic21Json from '@/content/g1-tex/topic21.json';
import texTopic22Json from '@/content/g1-tex/topic22.json';
import texTopic23Json from '@/content/g1-tex/topic23.json';
import texTopic24Json from '@/content/g1-tex/topic24.json';
import texTopic25Json from '@/content/g1-tex/topic25.json';
import texTopic26Json from '@/content/g1-tex/topic26.json';
import texTopic27Json from '@/content/g1-tex/topic27.json';
import texTopic28Json from '@/content/g1-tex/topic28.json';
import texTopic29Json from '@/content/g1-tex/topic29.json';
import texTopic30Json from '@/content/g1-tex/topic30.json';
import { G1_INGLIZ_UNITS, G1_INGLIZ_LESSONS, getInglizLesson } from '@/content/g1-ingliz/structure';

export const TOPIC01: Lesson = topic01Json as unknown as Lesson;
export const TOPIC02: Lesson = topic02Json as unknown as Lesson;

export const LESSONS: Record<string, Lesson> = {
  'g1-math-01': TOPIC01,
  'g1-math-02': TOPIC02,
  'g1-math-03': topic03Json as unknown as Lesson,
  'g1-math-04': topic04Json as unknown as Lesson,
  'g1-math-05': topic05Json as unknown as Lesson,
  'g1-math-06': topic06Json as unknown as Lesson,
  'g1-math-07': topic07Json as unknown as Lesson,
  'g1-math-08': topic08Json as unknown as Lesson,
  'g1-math-09': topic09Json as unknown as Lesson,
  'g1-math-10': topic10Json as unknown as Lesson,
  'g1-math-11': topic11Json as unknown as Lesson,
  'g1-math-12': topic12Json as unknown as Lesson,
  'g1-math-13': topic13Json as unknown as Lesson,
  'g1-math-14': topic14Json as unknown as Lesson,
  'g1-math-15': topic15Json as unknown as Lesson,
  'g1-math-16': topic16Json as unknown as Lesson,
  'g1-math-17': topic17Json as unknown as Lesson,
  'g1-math-18': topic18Json as unknown as Lesson,
  'g1-math-19': topic19Json as unknown as Lesson,
  'g1-math-20': topic20Json as unknown as Lesson,
  'g1-math-21': topic21Json as unknown as Lesson,
  'g1-math-22': topic22Json as unknown as Lesson,
  'g1-math-23': topic23Json as unknown as Lesson,
  'g1-math-24': topic24Json as unknown as Lesson,
  'g1-math-25': topic25Json as unknown as Lesson,
  'g1-math-26': topic26Json as unknown as Lesson,
  'g1-math-27': topic27Json as unknown as Lesson,
  'g1-math-28': topic28Json as unknown as Lesson,
  'g1-math-29': topic29Json as unknown as Lesson,
  'g1-math-30': topic30Json as unknown as Lesson,
  'g1-math-31': topic31Json as unknown as Lesson,
  'g1-math-32': topic32Json as unknown as Lesson,
  'g1-math-33': topic33Json as unknown as Lesson,
  'g1-math-34': topic34Json as unknown as Lesson,
  'g1-math-35': topic35Json as unknown as Lesson,
  'g1-math-36': topic36Json as unknown as Lesson,
  'g1-math-37': topic37Json as unknown as Lesson,
  'g1-math-38': topic38Json as unknown as Lesson,
  'g1-math-39': topic39Json as unknown as Lesson,
  'g1-math-40': topic40Json as unknown as Lesson,
  'g1-math-41': topic41Json as unknown as Lesson,
  'g1-math-42': topic42Json as unknown as Lesson,
  'g1-math-43': topic43Json as unknown as Lesson,
  'g1-math-44': topic44Json as unknown as Lesson,
  'g1-math-45': topic45Json as unknown as Lesson,
  'g1-math-46': topic46Json as unknown as Lesson,
  'g1-math-47': topic47Json as unknown as Lesson,
  'g1-math-48': topic48Json as unknown as Lesson,
  'g1-math-49': topic49Json as unknown as Lesson,
  'g1-math-50': topic50Json as unknown as Lesson,
  'g1-math-51': topic51Json as unknown as Lesson,
  'g1-math-52': topic52Json as unknown as Lesson,
  'g1-math-53': topic53Json as unknown as Lesson,
  'g1-math-54': topic54Json as unknown as Lesson,
  'g1-math-55': topic55Json as unknown as Lesson,
  'g1-math-56': topic56Json as unknown as Lesson,
  'g1-math-57': topic57Json as unknown as Lesson,
  'g1-math-58': topic58Json as unknown as Lesson,
  'g1-math-59': topic59Json as unknown as Lesson,
  'g1-math-60': topic60Json as unknown as Lesson,
  'g1-math-61': topic61Json as unknown as Lesson,
  'g1-math-62': topic62Json as unknown as Lesson,
  'g1-math-63': topic63Json as unknown as Lesson,
  'g1-math-64': topic64Json as unknown as Lesson,
  'g1-math-65': topic65Json as unknown as Lesson,
  'g1-math-66': topic66Json as unknown as Lesson,
  'g1-math-67': topic67Json as unknown as Lesson,
  'g1-math-68': topic68Json as unknown as Lesson,
  'g1-math-69': topic69Json as unknown as Lesson,
  'g1-math-70': topic70Json as unknown as Lesson,
  'g1-math-71': topic71Json as unknown as Lesson,
  'g1-math-72': topic72Json as unknown as Lesson,
  'g1-math-73': topic73Json as unknown as Lesson,
  'g1-math-75': topic75Json as unknown as Lesson,
  'g1-math-76': topic76Json as unknown as Lesson,
  'g1-math-77': topic77Json as unknown as Lesson,
  'g1-math-78': topic78Json as unknown as Lesson,
  'g1-math-79': topic79Json as unknown as Lesson,
  'g1-math-80': topic80Json as unknown as Lesson,
  'g1-math-81': topic81Json as unknown as Lesson,
  'g1-math-82': topic82Json as unknown as Lesson,
  'g1-math-83': topic83Json as unknown as Lesson,
  'g1-math-84': topic84Json as unknown as Lesson,
  'g1-math-85': topic85Json as unknown as Lesson,
  'g1-math-86': topic86Json as unknown as Lesson,
  'g1-math-87': topic87Json as unknown as Lesson,
  'g1-math-88': topic88Json as unknown as Lesson,
  'g1-math-89': topic89Json as unknown as Lesson,
  'g1-math-90': topic90Json as unknown as Lesson,
  'g1-math-91': topic91Json as unknown as Lesson,
  'g1-math-92': topic92Json as unknown as Lesson,
  'g1-math-93': topic93Json as unknown as Lesson,
  'g1-math-94': topic94Json as unknown as Lesson,
  'g1-math-95': topic95Json as unknown as Lesson,
  'g1-math-96': topic96Json as unknown as Lesson,
  'g1-math-97': topic97Json as unknown as Lesson,
  'g1-math-98': topic98Json as unknown as Lesson,
  'g1-math-99': topic99Json as unknown as Lesson,
  'g1-math-100': topic100Json as unknown as Lesson,
  'g1-math-101': topic101Json as unknown as Lesson,
  'g1-math-102': topic102Json as unknown as Lesson,
  'g1-math-103': topic103Json as unknown as Lesson,
  'g1-math-104': topic104Json as unknown as Lesson,
  'g1-math-105': topic105Json as unknown as Lesson,
  'g1-math-106': topic106Json as unknown as Lesson,
  'g1-math-107': topic107Json as unknown as Lesson,
  'g1-math-108': topic108Json as unknown as Lesson,
  'g1-math-109': topic109Json as unknown as Lesson,
  'g1-math-110': topic110Json as unknown as Lesson,
  'g1-math-111': topic111Json as unknown as Lesson,
  'g1-math-112': topic112Json as unknown as Lesson,
  'g1-math-113': topic113Json as unknown as Lesson,
  'g1-math-114': topic114Json as unknown as Lesson,
  'g1-math-115': topic115Json as unknown as Lesson,
  'g1-math-116': topic116Json as unknown as Lesson,
  'g1-math-117': topic117Json as unknown as Lesson,
  'g1-math-118': topic118Json as unknown as Lesson,
  'g1-math-119': topic119Json as unknown as Lesson,
  'g1-math-120': topic120Json as unknown as Lesson,
  'g1-math-121': topic121Json as unknown as Lesson,
  'g1-math-122': topic122Json as unknown as Lesson,
  'g1-math-123': topic123Json as unknown as Lesson,
  'g1-math-124': topic124Json as unknown as Lesson,
  'g1-math-125': topic125Json as unknown as Lesson,
  'g1-math-126': topic126Json as unknown as Lesson,
  'g1-math-127': topic127Json as unknown as Lesson,
  'g1-math-128': topic128Json as unknown as Lesson,
  'g1-math-129': topic129Json as unknown as Lesson,
  'g1-math-130': topic130Json as unknown as Lesson,
  'g1-math-131': topic131Json as unknown as Lesson,
  'g1-math-132': topic132Json as unknown as Lesson,
  'g1-math-133': topic133Json as unknown as Lesson,
  'g1-math-134': topic134Json as unknown as Lesson,
  'g1-math-135': topic135Json as unknown as Lesson,
  'g1-math-136': topic136Json as unknown as Lesson,
  'g1-math-137': topic137Json as unknown as Lesson,
  'g1-math-138': topic138Json as unknown as Lesson,
  'g1-math-139': topic139Json as unknown as Lesson,
  'g1-math-140': topic140Json as unknown as Lesson,
  'g1-math-141': topic141Json as unknown as Lesson,
  'g1-math-142': topic142Json as unknown as Lesson,
  'g1-math-143': topic143Json as unknown as Lesson,
  'g1-math-144': topic144Json as unknown as Lesson,
  'g1-math-review-1': review01Json as unknown as Lesson,
  'g1-math-review-2': review02Json as unknown as Lesson,
  'g1-math-review-3': review03Json as unknown as Lesson,
  'g1-math-review-4': review04Json as unknown as Lesson,
  'g1-ona-01': onaTopic01Json as unknown as Lesson,
  'g1-ona-02': onaTopic02Json as unknown as Lesson,
  'g1-ona-03': onaTopic03Json as unknown as Lesson,
  'g1-ona-04': onaTopic04Json as unknown as Lesson,
  'g1-ona-05': onaTopic05Json as unknown as Lesson,
  'g1-ona-06': onaTopic06Json as unknown as Lesson,
  'g1-ona-07': onaTopic07Json as unknown as Lesson,
  'g1-ona-08': onaTopic08Json as unknown as Lesson,
  'g1-ona-09': onaTopic09Json as unknown as Lesson,
  'g1-ona-10': onaTopic10Json as unknown as Lesson,
  'g1-ona-11': onaTopic11Json as unknown as Lesson,
  'g1-ona-12': onaTopic12Json as unknown as Lesson,
  'g1-ona-13': onaTopic13Json as unknown as Lesson,
  'g1-ona-14': onaTopic14Json as unknown as Lesson,
  'g1-ona-15': onaTopic15Json as unknown as Lesson,
  'g1-ona-16': onaTopic16Json as unknown as Lesson,
  'g1-ona-17': onaTopic17Json as unknown as Lesson,
  'g1-ona-18': onaTopic18Json as unknown as Lesson,
  'g1-ona-19': onaTopic19Json as unknown as Lesson,
  'g1-ona-20': onaTopic20Json as unknown as Lesson,
  'g1-ona-21': onaTopic21Json as unknown as Lesson,
  'g1-ona-22': onaTopic22Json as unknown as Lesson,
  'g1-ona-23': onaTopic23Json as unknown as Lesson,
  'g1-ona-24': onaTopic24Json as unknown as Lesson,
  'g1-ona-25': onaTopic25Json as unknown as Lesson,
  'g1-ona-26': onaTopic26Json as unknown as Lesson,
  'g1-ona-27': onaTopic27Json as unknown as Lesson,
  'g1-ona-28': onaTopic28Json as unknown as Lesson,
  'g1-ona-29': onaTopic29Json as unknown as Lesson,
  'g1-ona-30': onaTopic30Json as unknown as Lesson,
  'g1-ona-31': onaTopic31Json as unknown as Lesson,
  'g1-ona-32': onaTopic32Json as unknown as Lesson,
  'g1-ona-33': onaTopic33Json as unknown as Lesson,
  'g1-ona-34': onaTopic34Json as unknown as Lesson,
  'g1-ona-35': onaTopic35Json as unknown as Lesson,
  'g1-ona-36': onaTopic36Json as unknown as Lesson,
  'g1-ona-37': onaTopic37Json as unknown as Lesson,
  'g1-ona-38': onaTopic38Json as unknown as Lesson,
  'g1-ona-39': onaTopic39Json as unknown as Lesson,
  'g1-oqish-01': oqishTopic01Json as unknown as Lesson,
  'g1-oqish-02': oqishTopic02Json as unknown as Lesson,
  'g1-oqish-03': oqishTopic03Json as unknown as Lesson,
  'g1-oqish-04': oqishTopic04Json as unknown as Lesson,
  'g1-oqish-05': oqishTopic05Json as unknown as Lesson,
  'g1-oqish-06': oqishTopic06Json as unknown as Lesson,
  'g1-oqish-07': oqishTopic07Json as unknown as Lesson,
  'g1-oqish-08': oqishTopic08Json as unknown as Lesson,
  'g1-oqish-09': oqishTopic09Json as unknown as Lesson,
  'g1-oqish-10': oqishTopic10Json as unknown as Lesson,
  'g1-oqish-11': oqishTopic11Json as unknown as Lesson,
  'g1-oqish-12': oqishTopic12Json as unknown as Lesson,
  'g1-oqish-13': oqishTopic13Json as unknown as Lesson,
  'g1-oqish-14': oqishTopic14Json as unknown as Lesson,
  'g1-oqish-15': oqishTopic15Json as unknown as Lesson,
  'g1-oqish-16': oqishTopic16Json as unknown as Lesson,
  'g1-oqish-17': oqishTopic17Json as unknown as Lesson,
  'g1-oqish-18': oqishTopic18Json as unknown as Lesson,
  'g1-oqish-19': oqishTopic19Json as unknown as Lesson,
  'g1-oqish-20': oqishTopic20Json as unknown as Lesson,
  'g1-oqish-21': oqishTopic21Json as unknown as Lesson,
  'g1-oqish-22': oqishTopic22Json as unknown as Lesson,
  'g1-oqish-23': oqishTopic23Json as unknown as Lesson,
  'g1-oqish-24': oqishTopic24Json as unknown as Lesson,
  'g1-oqish-25': oqishTopic25Json as unknown as Lesson,
  'g1-oqish-26': oqishTopic26Json as unknown as Lesson,
  'g1-oqish-27': oqishTopic27Json as unknown as Lesson,
  'g1-oqish-28': oqishTopic28Json as unknown as Lesson,
  'g1-oqish-29': oqishTopic29Json as unknown as Lesson,
  'g1-oqish-30': oqishTopic30Json as unknown as Lesson,
  'g1-oqish-31': oqishTopic31Json as unknown as Lesson,
  'g1-oqish-32': oqishTopic32Json as unknown as Lesson,
  'g1-oqish-33': oqishTopic33Json as unknown as Lesson,
  'g1-oqish-34': oqishTopic34Json as unknown as Lesson,
  'g1-oqish-35': oqishTopic35Json as unknown as Lesson,
  'g1-oqish-36': oqishTopic36Json as unknown as Lesson,
  'g1-oqish-37': oqishTopic37Json as unknown as Lesson,
  'g1-oqish-38': oqishTopic38Json as unknown as Lesson,
  'g1-oqish-39': oqishTopic39Json as unknown as Lesson,
  'g1-oqish-40': oqishTopic40Json as unknown as Lesson,
  'g1-oqish-41': oqishTopic41Json as unknown as Lesson,
  'g1-oqish-42': oqishTopic42Json as unknown as Lesson,
  'g1-oqish-43': oqishTopic43Json as unknown as Lesson,
  'g1-oqish-44': oqishTopic44Json as unknown as Lesson,
  'g1-oqish-45': oqishTopic45Json as unknown as Lesson,
  'g1-oqish-46': oqishTopic46Json as unknown as Lesson,
  'g1-oqish-47': oqishTopic47Json as unknown as Lesson,
  'g1-oqish-48': oqishTopic48Json as unknown as Lesson,
  'g1-oqish-49': oqishTopic49Json as unknown as Lesson,
  'g1-oqish-50': oqishTopic50Json as unknown as Lesson,
  'g1-oqish-51': oqishTopic51Json as unknown as Lesson,
  'g1-oqish-52': oqishTopic52Json as unknown as Lesson,
  'g1-oqish-53': oqishTopic53Json as unknown as Lesson,
  'g1-oqish-54': oqishTopic54Json as unknown as Lesson,
  'g1-oqish-55': oqishTopic55Json as unknown as Lesson,
  'g1-oqish-56': oqishTopic56Json as unknown as Lesson,
  'g1-oqish-57': oqishTopic57Json as unknown as Lesson,
  'g1-oqish-58': oqishTopic58Json as unknown as Lesson,
  'g1-oqish-59': oqishTopic59Json as unknown as Lesson,
  'g1-oqish-60': oqishTopic60Json as unknown as Lesson,
  'g1-oqish-61': oqishTopic61Json as unknown as Lesson,
  'g1-oqish-62': oqishTopic62Json as unknown as Lesson,
  'g1-oqish-63': oqishTopic63Json as unknown as Lesson,
  'g1-oqish-64': oqishTopic64Json as unknown as Lesson,
  'g1-ona-40': onaTopic40Json as unknown as Lesson,
  'g1-ona-41': onaTopic41Json as unknown as Lesson,
  'g1-ona-42': onaTopic42Json as unknown as Lesson,
  'g1-ona-43': onaTopic43Json as unknown as Lesson,
  'g1-ona-44': onaTopic44Json as unknown as Lesson,
  'g1-ona-45': onaTopic45Json as unknown as Lesson,
  'g1-ona-46': onaTopic46Json as unknown as Lesson,
  'g1-ona-47': onaTopic47Json as unknown as Lesson,
  'g1-ona-48': onaTopic48Json as unknown as Lesson,
  'g1-ona-49': onaTopic49Json as unknown as Lesson,
  'g1-ona-50': onaTopic50Json as unknown as Lesson,
  'g1-ona-51': onaTopic51Json as unknown as Lesson,
  'g1-ona-52': onaTopic52Json as unknown as Lesson,
  'g1-ona-53': onaTopic53Json as unknown as Lesson,
  'g1-ona-54': onaTopic54Json as unknown as Lesson,
  'g1-ona-55': onaTopic55Json as unknown as Lesson,
  'g1-ona-56': onaTopic56Json as unknown as Lesson,
  'g1-ona-review-1': onaReview01Json as unknown as Lesson,
  'g1-ona-review-2': onaReview02Json as unknown as Lesson,
  'g1-tabiiy-01': tabiiyTopic01Json as unknown as Lesson,
  'g1-tabiiy-02': tabiiyTopic02Json as unknown as Lesson,
  'g1-tabiiy-03': tabiiyTopic03Json as unknown as Lesson,
  'g1-tabiiy-04': tabiiyTopic04Json as unknown as Lesson,
  'g1-tabiiy-05': tabiiyTopic05Json as unknown as Lesson,
  'g1-tabiiy-06': tabiiyTopic06Json as unknown as Lesson,
  'g1-tabiiy-07': tabiiyTopic07Json as unknown as Lesson,
  'g1-tabiiy-08': tabiiyTopic08Json as unknown as Lesson,
  'g1-tabiiy-09': tabiiyTopic09Json as unknown as Lesson,
  'g1-tabiiy-10': tabiiyTopic10Json as unknown as Lesson,
  'g1-tabiiy-11': tabiiyTopic11Json as unknown as Lesson,
  'g1-tabiiy-12': tabiiyTopic12Json as unknown as Lesson,
  'g1-tabiiy-13': tabiiyTopic13Json as unknown as Lesson,
  'g1-tabiiy-14': tabiiyTopic14Json as unknown as Lesson,
  'g1-tabiiy-15': tabiiyTopic15Json as unknown as Lesson,
  'g1-tabiiy-16': tabiiyTopic16Json as unknown as Lesson,
  'g1-tabiiy-17': tabiiyTopic17Json as unknown as Lesson,
  'g1-tabiiy-18': tabiiyTopic18Json as unknown as Lesson,
  'g1-tabiiy-19': tabiiyTopic19Json as unknown as Lesson,
  'g1-alifbe-01': alifbeTopic01Json as unknown as Lesson,
  'g1-alifbe-02': alifbeTopic02Json as unknown as Lesson,
  'g1-alifbe-03': alifbeTopic03Json as unknown as Lesson,
  'g1-alifbe-04': alifbeTopic04Json as unknown as Lesson,
  'g1-alifbe-05': alifbeTopic05Json as unknown as Lesson,
  'g1-alifbe-06': alifbeTopic06Json as unknown as Lesson,
  'g1-alifbe-07': alifbeTopic07Json as unknown as Lesson,
  'g1-alifbe-08': alifbeTopic08Json as unknown as Lesson,
  'g1-alifbe-09': alifbeTopic09Json as unknown as Lesson,
  'g1-alifbe-10': alifbeTopic10Json as unknown as Lesson,
  'g1-alifbe-11': alifbeTopic11Json as unknown as Lesson,
  'g1-alifbe-12': alifbeTopic12Json as unknown as Lesson,
  'g1-alifbe-13': alifbeTopic13Json as unknown as Lesson,
  'g1-alifbe-14': alifbeTopic14Json as unknown as Lesson,
  'g1-alifbe-15': alifbeTopic15Json as unknown as Lesson,
  'g1-alifbe-16': alifbeTopic16Json as unknown as Lesson,
  'g1-alifbe-17': alifbeTopic17Json as unknown as Lesson,
  'g1-alifbe-18': alifbeTopic18Json as unknown as Lesson,
  'g1-alifbe-19': alifbeTopic19Json as unknown as Lesson,
  'g1-alifbe-20': alifbeTopic20Json as unknown as Lesson,
  'g1-alifbe-21': alifbeTopic21Json as unknown as Lesson,
  'g1-alifbe-22': alifbeTopic22Json as unknown as Lesson,
  'g1-alifbe-23': alifbeTopic23Json as unknown as Lesson,
  'g1-alifbe-24': alifbeTopic24Json as unknown as Lesson,
  'g1-alifbe-25': alifbeTopic25Json as unknown as Lesson,
  'g1-alifbe-26': alifbeTopic26Json as unknown as Lesson,
  'g1-alifbe-27': alifbeTopic27Json as unknown as Lesson,
  'g1-alifbe-28': alifbeTopic28Json as unknown as Lesson,
  'g1-alifbe-29': alifbeTopic29Json as unknown as Lesson,
  'g1-alifbe-30': alifbeTopic30Json as unknown as Lesson,
  'g1-alifbe-31': alifbeTopic31Json as unknown as Lesson,
  'g1-alifbe-32': alifbeTopic32Json as unknown as Lesson,
  'g1-alifbe-33': alifbeTopic33Json as unknown as Lesson,
  'g1-alifbe-34': alifbeTopic34Json as unknown as Lesson,
  'g1-alifbe-35': alifbeTopic35Json as unknown as Lesson,
  'g1-alifbe-36': alifbeTopic36Json as unknown as Lesson,
  'g1-alifbe-37': alifbeTopic37Json as unknown as Lesson,
  'g1-alifbe-38': alifbeTopic38Json as unknown as Lesson,
  'g1-alifbe-39': alifbeTopic39Json as unknown as Lesson,
  'g1-alifbe-40': alifbeTopic40Json as unknown as Lesson,
  'g1-alifbe-41': alifbeTopic41Json as unknown as Lesson,
  'g1-alifbe-42': alifbeTopic42Json as unknown as Lesson,
  'g1-alifbe-43': alifbeTopic43Json as unknown as Lesson,
  'g1-alifbe-44': alifbeTopic44Json as unknown as Lesson,
  'g1-alifbe-45': alifbeTopic45Json as unknown as Lesson,
  'g1-alifbe-46': alifbeTopic46Json as unknown as Lesson,
  'g1-alifbe-47': alifbeTopic47Json as unknown as Lesson,
  'g1-alifbe-48': alifbeTopic48Json as unknown as Lesson,
  'g1-alifbe-49': alifbeTopic49Json as unknown as Lesson,
  'g1-alifbe-50': alifbeTopic50Json as unknown as Lesson,
  'g1-alifbe-51': alifbeTopic51Json as unknown as Lesson,
  'g1-alifbe-52': alifbeTopic52Json as unknown as Lesson,
  'g1-alifbe-53': alifbeTopic53Json as unknown as Lesson,
  'g1-alifbe-54': alifbeTopic54Json as unknown as Lesson,
  'g1-alifbe-55': alifbeTopic55Json as unknown as Lesson,
  'g1-alifbe-56': alifbeTopic56Json as unknown as Lesson,
  'g1-alifbe-57': alifbeTopic57Json as unknown as Lesson,
  'g1-alifbe-58': alifbeTopic58Json as unknown as Lesson,
  'g1-alifbe-59': alifbeTopic59Json as unknown as Lesson,
  'g1-alifbe-60': alifbeTopic60Json as unknown as Lesson,
  'g1-alifbe-61': alifbeTopic61Json as unknown as Lesson,
  'g1-alifbe-62': alifbeTopic62Json as unknown as Lesson,
  'g1-alifbe-63': alifbeTopic63Json as unknown as Lesson,
  'g1-alifbe-64': alifbeTopic64Json as unknown as Lesson,
  'g1-informatika-01': infoTopic01Json as unknown as Lesson,
  'g1-informatika-02': infoTopic02Json as unknown as Lesson,
  'g1-informatika-03': infoTopic03Json as unknown as Lesson,
  'g1-informatika-04': infoTopic04Json as unknown as Lesson,
  'g1-informatika-05': infoTopic05Json as unknown as Lesson,
  'g1-informatika-06': infoTopic06Json as unknown as Lesson,
  'g1-informatika-07': infoTopic07Json as unknown as Lesson,
  'g1-informatika-08': infoTopic08Json as unknown as Lesson,
  'g1-informatika-09': infoTopic09Json as unknown as Lesson,
  'g1-informatika-10': infoTopic10Json as unknown as Lesson,
  'g1-informatika-11': infoTopic11Json as unknown as Lesson,
  'g1-informatika-12': infoTopic12Json as unknown as Lesson,
  'g1-informatika-13': infoTopic13Json as unknown as Lesson,
  'g1-informatika-14': infoTopic14Json as unknown as Lesson,
  'g1-informatika-15': infoTopic15Json as unknown as Lesson,
  'g1-informatika-16': infoTopic16Json as unknown as Lesson,
  'g1-informatika-17': infoTopic17Json as unknown as Lesson,
  'g1-informatika-18': infoTopic18Json as unknown as Lesson,
  'g1-informatika-19': infoTopic19Json as unknown as Lesson,
  'g1-informatika-20': infoTopic20Json as unknown as Lesson,
  'g1-informatika-21': infoTopic21Json as unknown as Lesson,
  'g1-informatika-22': infoTopic22Json as unknown as Lesson,
  'g1-informatika-23': infoTopic23Json as unknown as Lesson,
  'g1-informatika-24': infoTopic24Json as unknown as Lesson,
  'g1-informatika-25': infoTopic25Json as unknown as Lesson,
  'g1-informatika-26': infoTopic26Json as unknown as Lesson,
  'g1-informatika-27': infoTopic27Json as unknown as Lesson,
  'g1-informatika-28': infoTopic28Json as unknown as Lesson,
  'g1-informatika-29': infoTopic29Json as unknown as Lesson,
  'g1-informatika-30': infoTopic30Json as unknown as Lesson,
  'g1-informatika-31': infoTopic31Json as unknown as Lesson,
  'g1-informatika-32': infoTopic32Json as unknown as Lesson,
  'g1-informatika-33': infoTopic33Json as unknown as Lesson,
  'g1-ingliz-01': inglizTopic01Json as unknown as Lesson,
  'g1-ingliz-02': inglizTopic02Json as unknown as Lesson,
  'g1-ingliz-03': inglizTopic03Json as unknown as Lesson,
  'g1-ingliz-04': inglizTopic04Json as unknown as Lesson,
  'g1-ingliz-05': inglizTopic05Json as unknown as Lesson,
  'g1-ingliz-06': inglizTopic06Json as unknown as Lesson,
  'g1-ingliz-07': inglizTopic07Json as unknown as Lesson,
  'g1-ingliz-08': inglizTopic08Json as unknown as Lesson,
  'g1-ingliz-09': inglizTopic09Json as unknown as Lesson,
  'g1-ingliz-10': inglizTopic10Json as unknown as Lesson,
  'g1-ingliz-11': inglizTopic11Json as unknown as Lesson,
  'g1-ingliz-12': inglizTopic12Json as unknown as Lesson,
  'g1-ingliz-13': inglizTopic13Json as unknown as Lesson,
  'g1-ingliz-14': inglizTopic14Json as unknown as Lesson,
  'g1-ingliz-15': inglizTopic15Json as unknown as Lesson,
  'g1-ingliz-16': inglizTopic16Json as unknown as Lesson,
  'g1-ingliz-17': inglizTopic17Json as unknown as Lesson,
  'g1-ingliz-18': inglizTopic18Json as unknown as Lesson,
  'g1-ingliz-19': inglizTopic19Json as unknown as Lesson,
  'g1-ingliz-20': inglizTopic20Json as unknown as Lesson,
  'g1-ingliz-21': inglizTopic21Json as unknown as Lesson,
  'g1-ingliz-22': inglizTopic22Json as unknown as Lesson,
  'g1-ingliz-23': inglizTopic23Json as unknown as Lesson,
  'g1-ingliz-24': inglizTopic24Json as unknown as Lesson,
  'g1-ingliz-25': inglizTopic25Json as unknown as Lesson,
  'g1-ingliz-26': inglizTopic26Json as unknown as Lesson,
  'g1-ingliz-27': inglizTopic27Json as unknown as Lesson,
  'g1-ingliz-28': inglizTopic28Json as unknown as Lesson,
  'g1-ingliz-29': inglizTopic29Json as unknown as Lesson,
  'g1-ingliz-30': inglizTopic30Json as unknown as Lesson,
  'g1-ingliz-31': inglizTopic31Json as unknown as Lesson,
  'g1-ingliz-32': inglizTopic32Json as unknown as Lesson,
  'g1-ingliz-33': inglizTopic33Json as unknown as Lesson,
  'g1-ingliz-34': inglizTopic34Json as unknown as Lesson,
  'g1-ingliz-35': inglizTopic35Json as unknown as Lesson,
  'g1-ingliz-36': inglizTopic36Json as unknown as Lesson,
  'g1-ingliz-37': inglizTopic37Json as unknown as Lesson,
  'g1-ingliz-38': inglizTopic38Json as unknown as Lesson,
  'g1-ingliz-39': inglizTopic39Json as unknown as Lesson,
  'g1-ingliz-40': inglizTopic40Json as unknown as Lesson,
  'g1-ingliz-41': inglizTopic41Json as unknown as Lesson,
  'g1-ingliz-42': inglizTopic42Json as unknown as Lesson,
  'g1-ingliz-43': inglizTopic43Json as unknown as Lesson,
  'g1-ingliz-44': inglizTopic44Json as unknown as Lesson,
  'g1-ingliz-45': inglizTopic45Json as unknown as Lesson,
  'g1-ingliz-46': inglizTopic46Json as unknown as Lesson,
  'g1-ingliz-47': inglizTopic47Json as unknown as Lesson,
  'g1-ingliz-48': inglizTopic48Json as unknown as Lesson,
  'g1-ingliz-49': inglizTopic49Json as unknown as Lesson,
  'g1-ingliz-50': inglizTopic50Json as unknown as Lesson,
  'g1-ingliz-51': inglizTopic51Json as unknown as Lesson,
  'g1-ingliz-52': inglizTopic52Json as unknown as Lesson,
  'g1-ingliz-53': inglizTopic53Json as unknown as Lesson,
  'g1-ingliz-54': inglizTopic54Json as unknown as Lesson,
  'g1-ingliz-55': inglizTopic55Json as unknown as Lesson,
  'g1-ingliz-56': inglizTopic56Json as unknown as Lesson,
  'g1-ingliz-57': inglizTopic57Json as unknown as Lesson,
  'g1-ingliz-58': inglizTopic58Json as unknown as Lesson,
  'g1-ingliz-59': inglizTopic59Json as unknown as Lesson,
  'g1-ingliz-60': inglizTopic60Json as unknown as Lesson,
  'g1-tarbiya-01': tarbiyaTopic01Json as unknown as Lesson,
  'g1-tarbiya-02': tarbiyaTopic02Json as unknown as Lesson,
  'g1-tarbiya-03': tarbiyaTopic03Json as unknown as Lesson,
  'g1-tarbiya-04': tarbiyaTopic04Json as unknown as Lesson,
  'g1-tarbiya-05': tarbiyaTopic05Json as unknown as Lesson,
  'g1-tarbiya-06': tarbiyaTopic06Json as unknown as Lesson,
  'g1-tarbiya-07': tarbiyaTopic07Json as unknown as Lesson,
  'g1-tarbiya-08': tarbiyaTopic08Json as unknown as Lesson,
  'g1-tarbiya-09': tarbiyaTopic09Json as unknown as Lesson,
  'g1-tarbiya-10': tarbiyaTopic10Json as unknown as Lesson,
  'g1-tarbiya-11': tarbiyaTopic11Json as unknown as Lesson,
  'g1-tarbiya-12': tarbiyaTopic12Json as unknown as Lesson,
  'g1-tarbiya-13': tarbiyaTopic13Json as unknown as Lesson,
  'g1-tarbiya-14': tarbiyaTopic14Json as unknown as Lesson,
  'g1-tarbiya-15': tarbiyaTopic15Json as unknown as Lesson,
  'g1-tarbiya-16': tarbiyaTopic16Json as unknown as Lesson,
  'g1-tarbiya-17': tarbiyaTopic17Json as unknown as Lesson,
  'g1-tarbiya-18': tarbiyaTopic18Json as unknown as Lesson,
  'g1-tarbiya-19': tarbiyaTopic19Json as unknown as Lesson,
  'g1-tarbiya-20': tarbiyaTopic20Json as unknown as Lesson,
  'g1-tarbiya-21': tarbiyaTopic21Json as unknown as Lesson,
  'g1-art-01': artTopic01Json as unknown as Lesson,
  'g1-art-02': artTopic02Json as unknown as Lesson,
  'g1-art-03': artTopic03Json as unknown as Lesson,
  'g1-art-04': artTopic04Json as unknown as Lesson,
  'g1-art-05': artTopic05Json as unknown as Lesson,
  'g1-art-06': artTopic06Json as unknown as Lesson,
  'g1-art-07': artTopic07Json as unknown as Lesson,
  'g1-art-08': artTopic08Json as unknown as Lesson,
  'g1-art-09': artTopic09Json as unknown as Lesson,
  'g1-art-10': artTopic10Json as unknown as Lesson,
  'g1-art-11': artTopic11Json as unknown as Lesson,
  'g1-art-12': artTopic12Json as unknown as Lesson,
  'g1-art-13': artTopic13Json as unknown as Lesson,
  'g1-art-14': artTopic14Json as unknown as Lesson,
  'g1-art-15': artTopic15Json as unknown as Lesson,
  'g1-art-16': artTopic16Json as unknown as Lesson,
  'g1-art-17': artTopic17Json as unknown as Lesson,
  'g1-art-18': artTopic18Json as unknown as Lesson,
  'g1-art-19': artTopic19Json as unknown as Lesson,
  'g1-art-20': artTopic20Json as unknown as Lesson,
  'g1-art-21': artTopic21Json as unknown as Lesson,
  'g1-art-22': artTopic22Json as unknown as Lesson,
  'g1-art-23': artTopic23Json as unknown as Lesson,
  'g1-art-24': artTopic24Json as unknown as Lesson,
  'g1-art-25': artTopic25Json as unknown as Lesson,
  'g1-art-26': artTopic26Json as unknown as Lesson,
  'g1-art-27': artTopic27Json as unknown as Lesson,
  'g1-art-28': artTopic28Json as unknown as Lesson,
  'g1-art-29': artTopic29Json as unknown as Lesson,
  'g1-art-30': artTopic30Json as unknown as Lesson,
  'g1-art-31': artTopic31Json as unknown as Lesson,
  'g1-art-32': artTopic32Json as unknown as Lesson,
  'g1-art-33': artTopic33Json as unknown as Lesson,
  'g1-art-34': artTopic34Json as unknown as Lesson,
  'g1-art-35': artTopic35Json as unknown as Lesson,
  'g1-art-36': artTopic36Json as unknown as Lesson,
  'g1-tex-01': texTopic01Json as unknown as Lesson,
  'g1-tex-02': texTopic02Json as unknown as Lesson,
  'g1-tex-03': texTopic03Json as unknown as Lesson,
  'g1-tex-04': texTopic04Json as unknown as Lesson,
  'g1-tex-05': texTopic05Json as unknown as Lesson,
  'g1-tex-06': texTopic06Json as unknown as Lesson,
  'g1-tex-07': texTopic07Json as unknown as Lesson,
  'g1-tex-08': texTopic08Json as unknown as Lesson,
  'g1-tex-09': texTopic09Json as unknown as Lesson,
  'g1-tex-10': texTopic10Json as unknown as Lesson,
  'g1-tex-11': texTopic11Json as unknown as Lesson,
  'g1-tex-12': texTopic12Json as unknown as Lesson,
  'g1-tex-13': texTopic13Json as unknown as Lesson,
  'g1-tex-14': texTopic14Json as unknown as Lesson,
  'g1-tex-15': texTopic15Json as unknown as Lesson,
  'g1-tex-16': texTopic16Json as unknown as Lesson,
  'g1-tex-17': texTopic17Json as unknown as Lesson,
  'g1-tex-18': texTopic18Json as unknown as Lesson,
  'g1-tex-19': texTopic19Json as unknown as Lesson,
  'g1-tex-20': texTopic20Json as unknown as Lesson,
  'g1-tex-21': texTopic21Json as unknown as Lesson,
  'g1-tex-22': texTopic22Json as unknown as Lesson,
  'g1-tex-23': texTopic23Json as unknown as Lesson,
  'g1-tex-24': texTopic24Json as unknown as Lesson,
  'g1-tex-25': texTopic25Json as unknown as Lesson,
  'g1-tex-26': texTopic26Json as unknown as Lesson,
  'g1-tex-27': texTopic27Json as unknown as Lesson,
  'g1-tex-28': texTopic28Json as unknown as Lesson,
  'g1-tex-29': texTopic29Json as unknown as Lesson,
  'g1-tex-30': texTopic30Json as unknown as Lesson
};

/**
 * Review "game" lessons (e.g. Grand Prix). They live in the Mavzular grid at a
 * fixed position and are intentionally NOT part of G1_MATH_TOPICS, so finishing
 * one never moves it into "Hozircha oʻrganganlarim" — it stays in Mavzular.
 */
export type ReviewLesson = { key: string; after: number; title: L10n; built: boolean };
export const G1_MATH_REVIEWS: ReviewLesson[] = [
  {
    key: 'g1-math-review-1',
    after: 10,
    title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' },
    built: true
  },
  { key: 'g1-math-review-2', after: 20, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: true },
  { key: 'g1-math-review-3', after: 30, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: true },
  { key: 'g1-math-review-4', after: 40, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: true }
];

/**
 * Ona tili review "game" lessons — same rules as the math ones: they sit at
 * fixed positions in the Mavzular grid and are NOT part of G1_ONA_TOPICS, so
 * finishing one never moves it into "Hozircha oʻrganganlarim".
 */
export const G1_ONA_REVIEWS: ReviewLesson[] = [
  {
    key: 'g1-ona-review-1',
    after: 10,
    title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' },
    built: true
  },
  { key: 'g1-ona-review-2', after: 20, title: { uz: 'Takrorlash oʻyini', ru: 'Игра-повторение', en: 'Review game' }, built: true }
];

/** Topic keys that have a fully built, playable lesson (vs. "coming soon"). */
export const BUILT_TOPIC_KEYS = new Set(Object.keys(LESSONS));

export { G1_MATH_TOPICS, getTopic };
export { G1_ONA_TOPICS, getOnaTopic };
export { G1_TABIIY_TOPICS, getTabiiyTopic };
export { G1_ALIFBE_TOPICS, getAlifbeTopic };
export { G1_INGLIZ_UNITS, G1_INGLIZ_LESSONS, getInglizLesson };

export function getLesson(topicKey: string): Lesson | undefined {
  return LESSONS[topicKey];
}

export function isBuiltTopic(topicKey: string): boolean {
  return BUILT_TOPIC_KEYS.has(topicKey);
}
