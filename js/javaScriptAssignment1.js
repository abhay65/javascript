const readline = require('readline');
const fs = require('fs');
var header=[];
var AsiaCountries=[];
var ruralPopulationByYear=[];
var urbanPopulationByYear=[];

for(var j=0;j<56;j++){
	ruralPopulationByYear[j]=0;
	urbanPopulationByYear[j]=0;
	AsiaCountries[j]=0;
}

var jsonData=[];
var tempData={};

var country=["afghanistan","armenia","azerbaijan","bahrain","bangladesh","bhutan","brunei","cambodia","china","cyprus","georgia","india","indonesia","iran","iraq","israel","japan","jordan","kazakhstan","kuwait","kyrgyzstan","laos","lebanon","malaysia","maldives","mongolia","myanmar","nepal","north Korea","oman","pakistan","palestine","philippines","qatar","russia","saudi Arabia","singapore","south Korea","sri Lanka","syria","taiwan","tajikistan","thailand","timor Leste","turkey","turkmenistan","united arab emirates","uzbekistan","vietnam","yemen"];

const rl = readline.createInterface({
	input: fs.createReadStream('../Indicators.csv')
});

rl.on('line',function(line)
{
	var lineRecords=line.trim().split(',');
	var flag=0;
	for(var k=0;k<country.length;k++)
	{
		if(lineRecords[0].toLowerCase()==[country[k]])
		{
			flag=1;
			break;
		}
	}

	if(flag==1)
	{
		var count=0;
		if(lineRecords[2]=='Rural population' )
		{
			count=1;
			ruralPopulationByYear[parseInt(lineRecords[4],10)-1960] = ruralPopulationByYear[parseInt(lineRecords[4],10)-1960]+parseFloat(lineRecords[5],10);
		}
		else if(lineRecords[2]=='Urban population' )
		{
			count=1;
			urbanPopulationByYear[parseInt(lineRecords[4],10)-1960] = urbanPopulationByYear[parseInt(lineRecords[4],10)-1960]+parseFloat(lineRecords[5],10);
		}

		if(count==1)
		{
			AsiaCountries[parseInt(lineRecords[4],10)-1960]=AsiaCountries[parseInt(lineRecords[4],10)-1960]+1;
		}
	}

});


rl.on('close',function()
{

	for(var l=0;l<55;l++)
	{

		tempData={};
		tempData["Year"]=(1960+l).toString();
		tempData["ruralPopulation"]=((ruralPopulationByYear[l]/AsiaCountries[l])*2).toString();
		tempData["urbanPopulation"]=((urbanPopulationByYear[l]/AsiaCountries[l])*2).toString();

		jsonData.push(tempData);

	}

	fs.writeFileSync("../json/data1.json",JSON.stringify(jsonData),encoding="utf8");

});
