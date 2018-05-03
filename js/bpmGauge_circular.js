// Circular BPM gauge
$("#circularGaugeContainer").dxCircularGauge({
    rangeContainer: { 
      offset: 10,
      ranges: [
        {startValue: 0, endValue: 60, color: 'grey'},
        {startValue: 60, endValue: 140, color: 'white'},
        {startValue: 140, endValue: 200, color: 'grey'}
      ]
    },
    scale: {
      startValue: 0,  endValue: 200,
      majorTick: { tickInterval: 20 },
      label: {
        format: 'number',
        fontColor: 'white'
      }
    },
    tooltip: {
      enabled: true,
      format: 'number',
          customizeText: function (arg) {
              return 'Current ' + arg.valueText;
          }
      },
    value: 78
});

// User input
$("#circularGaugeContainer_user").dxCircularGauge({
    rangeContainer: { 
      offset: 10,
      ranges: [
        {startValue: 0, endValue: 60, color: 'grey'},
        {startValue: 60, endValue: 140, color: 'white'},
        {startValue: 140, endValue: 200, color: 'grey'}
      ]
    },
    scale: {
      startValue: 0,  endValue: 200,
      majorTick: { tickInterval: 20 },
      label: {
        format: 'number',
        fontColor: 'white'
      }
    },
    tooltip: {
      enabled: true,
      format: 'number',
          customizeText: function (arg) {
              return 'Current ' + arg.valueText;
          }
      },
    value: 64
});