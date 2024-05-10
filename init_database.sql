SET sql_mode = 'STRICT_TRANS_TABLES';

CREATE DATABASE IF NOT EXISTS MyDatabase;
USE MyDatabase;

DROP TABLE IF EXISTS basket;
DROP TABLE IF EXISTS stock;

CREATE TABLE basket(
   id              VARCHAR(30) NOT NULL
  ,name            VARCHAR(45)
  ,price           INTEGER 
  ,currency        VARCHAR(30)
  ,rebateQuantity  INTEGER 
  ,rebatePercent   INTEGER 
  ,upsellProductId VARCHAR(30)
  ,imageUrl        VARCHAR(255)
  ,quantity        INTEGER
  ,PRIMARY KEY (id)
);

CREATE TABLE stock(
  id              VARCHAR(30) NOT NULL
  ,stock          INTEGER
  ,PRIMARY KEY (id)
  ,FOREIGN KEY (id) REFERENCES basket(id)
);

INSERT INTO basket(id,name,price,currency,rebateQuantity,rebatePercent,upsellProductId, imageUrl, quantity) 
VALUES 
('vitamin-d-90-120','D-vitamin, 90ug, 100 stk',116,'DKK',3,10,'','https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878',1),
('vitamin-c-500-200','C-vitamin, 500mg, 200 stk',150,'DKK',2,25,'vitamin-c-depot-500-250','https://images.matas.dk/Assets_v3/600001-700000/636001-637000/636601-636700/636640/productlist_v1_x2.jpg',1),
('vitamin-c-depot-500-250','C-vitamin Depot, 500mg, 250 stk',175,'DKK',3,10,'','https://images.matas.dk/Assets_v3/600001-700000/631001-632000/631601-631700/631666/product_v1_x2.jpg',1),
('fish-oil-1000-120','Omega 3 fiskeolie, 1000mg, 120 stk',69,'DKK',5,10,'','https://www.weightworld.dk/assets/weightworld/weightworld.dk/images/product/ls_high_res/krill-oil-softgels.jpg',1),
('coffee-grinder','Kaffekværn',145,'DKK',0,0,'coffee-grinder-pro','https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1582063504-3113bdgisL.jpg',1),
('coffee-grinder-pro','Kaffekværn Præcision',320,'DKK',0,0,'','https://breville-production-aem-assets.s3.us-west-2.amazonaws.com/BCG820/dna1_en_UK.jpg',1),
('toothbrush','Tandbørste, 5stk',40,'DKK',0,0,'toothbrush-bamboo','https://images.matas.dk/trs/w365/Assets_v3/700001-800000/742001-743000/742801-742900/742846/product_v1_x2.jpg',1),
('toothbrush-bamboo','Tandbørste i bambus, 3stk',40,'DKK',2,10,'','https://www.okofamilien.dk/wp-content/uploads/2021/04/pandoo_bambus_tandboerste_boern-450x450.jpg',1),
('trimmer','Barbermaskine',200,'DKK',0,0,'trimmer-battery','https://www.coolpriser.dk/images/bb/2501/5608475013072_S4700085_P0-v_1-p.jpg',1),
('trimmer-battery','Barbermaskine m batteri',350,'DKK',0,0,'','https://www.helsebixen.dk/shop/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/f/3/f3_1.png',1),
('hair-clip','Hårklemme',25,'DKK',2,20,'hair-clip-large','https://thumbs.nosto.com/quick/uv79anmc/9/320256/e370f5e6fc5dd7a48645339f1b3d82bd86f8f1b9426bcb9f78eb770626956412/A',1),
('hair-clip-large','Hårklemme, stor',45,'DKK',0,0,'','https://www.emborgdesign.dk/images/115StorklemmeBRUN-p.jpg',1),
('scarf-cotton','Tørklæde, bomuld',100,'DKK',2,10,'scarf-wool','https://sw4604.sfstatic.io/upload_dir/shop/04-07-11-samso-nature-fotoshare/_thumbs/IMG_2399.w610.h610.fill.jpg',1),
('scarf-wool','Tørklæde, uld',150,'DKK',2,10,'scarf-silk','https://www.bestman.dk/images/10121124-p.jpg',1),
('scarf-silk','Tørklæde, silke',250,'DKK',2,10,'','https://oestensperle.dk/wp-content/uploads/2020/01/DSC_0003.jpg',1),
('cap','Kasket',150,'DKK',2,10,'cap-flat', 'https://reklamedimser.dk/wp-content/uploads/2016/08/kasket-med-logo-tryk-navy-reklamedimser3.jpg', 1),
('cap-flat','Kasket, sixpence',590,'DKK',0,0,'','https://shop13851.sfstatic.io/upload_dir/shop/_thumbs/Towny-100-Linen-Brown.w610.h610.fill.jpg',1),
('teddy','Plysbamse',75,'DKK',0,0,'teddy-large','https://cdn.shopify.com/s/files/1/0748/9103/products/jellycat_23_Bumbly_Bear_small_BUM6BR.jpg?v=1673451290',1),
('teddy-large','Plysbamse, stor',150,'DKK',0,0,'','https://cdn11.bigcommerce.com/s-kaxlmzv/images/stencil/1280x1280/products/1476/6036/Teddy_Bear_-_Steve_Large_Bear_Family_70cm__65681.1656458493.JPG?c=2',1),
('kids-songbook','De små synger',120,'DKK',0,0,'kids-songbook-hardcover','https://imgcdn.saxo.com/_9788714195519',1),
('kids-songbook-hardcover','De små synger, indbundet',180,'DKK',0,0,'','https://imgcdn.saxo.com/_9788714195519',1),
('coffeebeans-500g','Kaffebønner',50,'DKK',4,25,'coffeebeans-organic-500g','https://www.logicvending.co.uk/wp-content/uploads/2019/07/kokebi-rwanda-100-arabica-speciality-coffee-beans-500g-10-e1665501397947.jpg',1),
('coffeebeans-organic-500g','Kaffebønner, økologiske',60,'DKK',2,10,'','https://www.caffemolinari.com.cy/eshop/image/cache/catalog/products/molinari/organic_line_bio/8550-800x800.jpg',1),
('the-english-100g','Sort te, 100g',20,'DKK',4,25,'the-darjeeling-100g','https://images.squarespace-cdn.com/content/v1/5d4d363a6ff1830001300098/1605016085638-WR1W5JHVM8FO006LY32X/English+Breakfast+%282%29.jpg?format=300w',1),
('the-darjeeling-100g','Sort te, Darjeeling, 100g',30,'DKK',4,25,'the-organic-100g','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMmNN_8Lv6sV_rE4SmAAydhBsV4SHeWWD3K5G2LlPIRhG0plHQwHOyNSDt0lro-GH17Kk&usqp=CAU',1),
('the-organic-100g','Sort te, Darjeeling, økologisk, 100g',35,'DKK',2,10,'','https://cdn.shopify.com/s/files/1/0724/4451/products/hamstead_LT_pouch_Darjeeling_rgb_S._600x.png?v=1614230711',1),
('sugar-white-1kg','Sukker, hvidt, 1000g',30,'DKK',4,25,'sugar-cane-1kg','https://www.dansukker.dk/Admin/Public/GetImage.ashx?image=%2FFiles%2Fproduct-cataloge%2Fproduct_large%2Fdansk-sukker-1kg.png&width=640&format=webp',1),
('sugar-cane-1kg','Rørsukker, 1000g',40,'DKK',4,25,'sugar-organic-1kg','https://www.fotoagent.dk/single_picture/11731/138/mega/1354824_1.jpg',1),
('sugar-organic-1kg','Rørsukker, økologisk, 1000g',45,'DKK',2,10,'','https://cdn.shopify.com/s/files/1/2854/8548/products/roersukker-brasilien-oe_800x.jpg?v=1587692100',1);

INSERT INTO stock (id, stock)
SELECT id, 100 AS stock
FROM basket;