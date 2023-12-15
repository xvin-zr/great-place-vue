import { Card, LineChart, Title } from "@tremor/react";

function LineChartReact({ successData, feesData }) {
  console.log(successData, feesData);

  const chartData = [];
  for (const [key, val] of Object.entries(successData)) {
    chartData.push({
      month: key,
      成交数: val,
      中介费: feesData[key],
    });
  }
  console.log(chartData);
  return (
    <Card className="h-[700px]">
      <Title className="text-[30px]">成交单数与中介费</Title>
      <LineChart
        className="text-tremor-title h-[500px]"
        data={chartData}
        index="month"
        categories={["成交数", "中介费"]}
        colors={["blue", "red"]}
        // showAnimation={true}
        // yAxisWidth={40}
      />
    </Card>
  );
}

export default LineChartReact;
