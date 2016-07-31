const readline = require('readline');
const fs = require('fs');
var ruralPopulationByYear=[];
var urbanPopulationByYear=[];
for(var j=0;j<56;j++){
	ruralPopulationByYear[j]=0;
	urbanPopulationByYear[j]=0;
}
var jsonData=[];
var tempData={};

const rl = readline.createInterface({
	input: fs.createReadStream('../Indicators.csv')
});

rl.on('line',function(line)
{
	var lineRecords=line.trim().split(',');


			if(lineRecords[0]=='India')
			{

				if(lineRecords[2]=='Urban population (% of total)')
				{
					urbanPopulationByYear[parseInt(lineRecords[4],10)-1960] = parseFloat(lineRecords[5],10);
				}
				else if(lineRecords[2]=='Rural population (% of total population)')
				{
					ruralPopulationByYear[parseInt(lineRecords[4],10)-1960] = parseFloat(lineRecords[5],10);
				}

			}


});

rl.on('close',function()
{
	for(var l=0;l<56;l++)
	{

		tempData={};
		tempData["Year"]=(1960+l).toString();
		tempData["Rural population (% of total population)"]=ruralPopulationByYear[l].toString();
		tempData["Urban population (% of total)"]=urbanPopulationByYear[l].toString();

		jsonData.push(tempData);

	}

	fs.writeFileSync("../json/data2.json",JSON.stringify(jsonData),encoding="utf8");

});
