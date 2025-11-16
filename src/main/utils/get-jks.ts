import deepalCertJks from '@root/resources/jks/deepal-cert.jks?asset&asarUnpack';
import qiyuanCertJks from '@root/resources/jks/qiyuan-cert.jks?asset&asarUnpack';
import tinnoveCertJks from '@root/resources/jks/tinnove-cert.jks?asset&asarUnpack';
import iFlyAutoCertJks from '@root/resources/jks/iFlyAuto-cert.jks?asset&asarUnpack';

interface CertJks {
  value: string;
  label: string;
  path: string;
}

const certJksList: CertJks[] = [
  {
    value: 'tinnove',
    label: '梧桐 OS',
    path: tinnoveCertJks,
  },
  {
    value: 'iFlyAuto',
    label: '飞鱼 OS',
    path: iFlyAutoCertJks,
  },
  {
    value: 'deepal',
    label: 'Deepal OS',
    path: deepalCertJks,
  },
  {
    value: 'qiyuan',
    label: '启源 OS',
    path: qiyuanCertJks,
  },
];

export const getJks = (type: string): CertJks => {
  return certJksList.find((item) => item.value === type)!;
};

export default certJksList;
