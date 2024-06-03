import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const koreaCityDataRaw = fs.readFileSync(
  path.resolve(__dirname, 'json/korea-city.json'),
  'utf8',
);
const koreaCityData = JSON.parse(koreaCityDataRaw);

const koreaResidenceDistrictDataRaw = fs.readFileSync(
  path.resolve(__dirname, 'json/korea-residence-district.json'),
  'utf8',
);
const koreaResidenceDistrictData = JSON.parse(koreaResidenceDistrictDataRaw);

/**
 * @command **npx prisma db seed**
 * */
const prisma = new PrismaClient();

async function main() {
  await funcAdmin(); //관리자
  await funcUser(); //유저
  await funcPost();
}

// ---------------------------------seed: 관리자
const funcAdmin = async () => {
  // seed 관리자 생성
  await prisma.admin.createMany({
    data: [
      {
        loginId: 'mind',
        password: await bcrypt.hash(
          process.env.SEED_ADMIN_PW! + process.env.PASSWORD_SECRET_KEY,
          Number(process.env.PASSWORD_SALT),
        ),
        nickname: 'mind',
      },
    ],
  });
};

// ---------------------------------seed: 유저
const funcUser = async () => {
  // 한국 지역 (시)
  await prisma.infoKoreaCity.createMany({
    data: koreaCityData,
  });

  // 한국 지역 (군/구)
  await prisma.infoKoreaResidenceDistrict.createMany({
    data: koreaResidenceDistrictData,
  });
};

// ---------------------------------seed: 게시물
const funcPost = async () => {};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
