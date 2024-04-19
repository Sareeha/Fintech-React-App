import Top20MostActive from "./Top20MostActive";
import Top20Gainers from "./Top20Gainers";
import Top20Losers from "./Top20Losers";




function Top20Table({ list = [], chartData }) {

  return (
    <div>
{    console.log(list)
}      <Top20MostActive
        data={list.most_actively_traded}
      />
      
      <Top20Gainers
        data={list.top_gainers}
      />
      
      <Top20Losers
        data={list.top_losers}
      />
    </div>
  );
}

export default Top20Table;
