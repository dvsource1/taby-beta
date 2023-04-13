import Record from './record';

export default function mapRecord(ad): Record {
  const { adv: advertisement, advertiser } = ad;
  const {
    advNo,
    fiatSymbol,
    price,
    minSingleTransAmount,
    maxSingleTransAmount,
    asset,
    minSingleTransQuantity,
    maxSingleTransQuantity,
  } = advertisement;
  const { nickName, monthFinishRate, monthOrderCount } = advertiser;
  const record = {
    advNo,
    fiatSymbol,
    price,
    minSingleTransAmount,
    maxSingleTransAmount,
    asset,
    minSingleTransQuantity,
    maxSingleTransQuantity,
    nickName,
    monthFinishRate,
    monthOrderCount,
  };
  return record;
}
