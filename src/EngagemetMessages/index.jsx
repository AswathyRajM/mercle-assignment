import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import engagementHelper from './EngagementHelper';
import channels from './../data/channels.json';
import messageCountList from './../data/messageCountList.json';

const EngagementMessagesOverTime = () => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
