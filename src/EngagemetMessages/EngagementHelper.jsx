import Highcharts, { color } from 'highcharts';

const colors = {
  bg: '#22222C',
  font: '#58595D',
  plot: '#067F7F',
  black: '#0C0C0F',
  white: '#E5E5E5',
};

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    const series = []; // stores the data to pass to the high chart
    const msgList = new Map(); //stores groups messages by channelId and date

    // Groups messages by channelId and date
    messageCountList.forEach((message) => {
      const date = new Date(message.timeBucket).toISOString().slice(0, 10);
      const count = parseInt(message.count);

      if (!msgList.has(message.channelId)) msgList.set(message.channelId, []);

      msgList.get(message.channelId).push({ date, count });
    });

    // Prepare data series for Highcharts
    channels.forEach((channel) => {
      if (msgList.has(channel.id) && msgList.get(channel.id).length > 1) {
        const data = msgList
          .get(channel.id)
          .map(({ date, count }) => [new Date(date).getTime(), count]);

        series.push({
          name: channel.name,
          data: data,
        });
      }
    });

    const options = {
      chart: {
        type: 'spline',
        backgroundColor: colors.bg,
      },

      title: {
        text: 'Messages Over Time',
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000, //1 day
        lineColor: colors.font,
        tickColor: colors.font,
        title: {
          text: 'Date',
          style: {
            color: colors.font,
          },
        },
        labels: {
          style: {
            color: colors.font,
          },
        },
      },
      yAxis: {
        title: {
          text: 'Message Count',
        },
        lineColor: colors.font,
        tickColor: colors.font,
        labels: {
          style: {
            color: colors.font,
          },
        },
        gridLineColor: 'transparent',
      },
      plotOptions: {
        series: {
          color: colors.plot,
        },
      },
      legend: {
        backgroundColor: colors.black,
        itemStyle: {
          color: colors.white,
        },
        itemHoverStyle: {
          color: colors.plot,
        },
      },
      tooltip: {
        backgroundColor: colors.bg,
        borderWidth: 1,
        style: {
          color: colors.white,
        },
        formatter: function () {
          return `<b >${this.series.name}</b><br/>${
            this.y
          } messages on ${Highcharts.dateFormat('%b %d', this.x)}`;
        },
        shared: true,
      },
      series: series,
    };

    return options;
  },
};

export default engagementHelper;
