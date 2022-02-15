import findBestFarm from 'farmComparisonService.js';

describe('test best farm', () => {
    const farmData = [
        {
          provider: 'Benqi',
          coin: 'DAI.e',
          tvl: '$6.18M',
          farmAPY: '10.8',
          contractAddress: '0x9669Fe1ea0d8883661289461b90a10B71Ae400Ee'
        },
        {
          provider: 'Benqi',
          coin: 'USDT.e',
          tvl: '$13.9M',
          farmAPY: '8.8',
          contractAddress: '0x07B0E11D80Ccf75CB390c9Be6c27f329c119095A'
        },
        {
          provider: 'Aave',
          coin: 'DAI.e',
          tvl: '$12.1M',
          farmAPY: '8.0',
          contractAddress: '0xA914FEb3C4B580fF6933CEa4f39988Cd10Aa2985'
        },
        {
          provider: 'BankerJoe',
          coin: 'USDT.e',
          tvl: '$7.79M',
          farmAPY: '8.0',
          contractAddress: '0x964555644E067c560A4C144360507E80c1104784'
        }
      ];

      test('findBestFarm returns investedFarm when investedFarm is best return', () => {
        const investedFarmData = {
            provider: 'Blizz',
            coin: 'DAI.e',
            tvl: '$708K',
            farmAPY: '20',
            contractAddress: '0x8c571111fc30F921774F3CaA3E1a20E464173C9d'
        };
        expect(findBestFarm(investedFarmData, farmData)).toBe(investedFarmData);
      })


});