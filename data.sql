INSERT INTO tours."Tours"(
	"Id", "AuthorId", "Category", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "IsDeleted", "Distance", "PublishDate", "ArchiveDate", "Durations")
	VALUES
		(-1, -2, 2, 'Šetnja pored Dunava', 'Tura po obali Dunava u Novom Sadu', 2, '{obala,reka}', 1, 100, FALSE, 2.1, '2023-12-04 19:04:04.562161+01', '2023-12-04 19:04:04.562161+01', '[{"Duration": 20, "TransportType": 1}]'),
		(-2, -2, 2, 'Obilazak centra', 'Tura po centru Novog Sada', 2, '{grad,istorija,centar}', 1, 100, FALSE, 0.36, '2023-12-04 19:04:04.562161+01', '2023-12-04 19:04:04.562161+01', '[{"Duration": 30, "TransportType": 1}]'),
		(-3, -2, 2, 'Novosadski Kulturni Prolaz', 'Upustite se u fascinantno putovanje kroz srce Vojvodine sa turom ''Novosadski Kulturni Prolaz''. Ova dinamična ruta vodi vas kroz bogatu istoriju i savremenu vibraciju Novog Sada, obuhvatajući ključne tačke kao što su monumentalna Petrovaradinska tvrđava, mirni Dunavski park i inspirativni Muzej savremene umetnosti Vojvodine. Saznajte ogradu oko tvrđave, uživajte u zelenim oazama Dunavskog parka i doživite umetnost na potpuno nov način u Muzeju savremene umetnosti. ''Novosadski Kulturni Prolaz'' pruža nezaboravno iskustvo koje istražuje spoj prošlosti, prirode i umetnosti u srcu ovog čarobnog grada.', 3, '{Umetnost,Muzej,Park,Istorija,Kultura}', 1, 169, false, 0, '-infinity', '-infinity', '[]'),
		(-20, -2, 3, 'Obilazak centra', 'Tura po centru Novog Sada', 2, '{grad,istorija,centar}', 1, 100, FALSE, 0.36, '2023-12-04 19:04:04.562161+01', '2023-12-04 19:04:04.562161+01', '[{"Duration": 30, "TransportType": 1}]'),
		(-21, -2, 3, 'Muzeji Novog Sada', 'Obilazak muzeja Novog Sada', 3, '{Umetnost,Muzej,Istorija,Kultura}', 1, 340, false, 1.7, '-infinity', '-infinity', '[]'),
		(-22, -2, 3, 'Istorija Novog Sada', 'Istorijski pogled na grad.', 3, '{Istorija,Kultura,Setnja}', 1, 150, false, 2.3, '-infinity', '-infinity', '[]'),
		(-23, -2, 1, 'Parkovi Novog Sada', 'Obilazag parkova Novog Sada.', 3, '{Park,Kultura,Aktivnost,Setnja}', 1, 55, false, 0.4, '-infinity', '-infinity', '[]'),
		(-24, -2, 1, 'Evropska prestonica kulture', 'Obilazak znacajnih mesta u gradu', 3, '{Umetnost,Kultura}', 1, 100, false, 1.6, '-infinity', '-infinity', '[]'),		
		(-25, -2, 2, 'Obilazak restorana Novog Sada', 'Probajte specijalitete Novog Sada u popularnim restoranima.', 3, '{Gastronomija,Hrana}', 1, 280, false, 3.1, '-infinity', '-infinity', '[]'),
		(-26, -2, 2, 'Vinarije u Novom Sadu', 'Probajte super vina.', 2, '{Gastronomija,Vino}', 1, 40, false, 0.2, '-infinity', '-infinity', '[]'),
		(-27, -2, 0, 'Izlasci u Novom Sadu', 'Posetite popularne pubove.', 5, '{Umetnost,Muzej,Park,Istorija,Kultura}', 1, 190, false, 0.9, '-infinity', '-infinity', '[]'),
		(-28, -2, 3, 'Setnja gradom', 'Protegnite noge u Novom Sadu.', 1, '{Setnja,Park,Aktivnost}', 1, 230, false, 1.3, '-infinity', '-infinity', '[]'),
		(-29, -2, 3, 'Tura sa enkaunterom', 'Neki opis vau', 4, '{kultura,arhitektura}', 1, 250, false, 7.86, '2023-12-27 21:55:47.844174+01', '-infinity', '[{"Data": [{"Duration": 176, "TransportType": 0}, {"Duration": 54, "TransportType": 2}]}]');

INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-1, 5, 'Great and exciting tour.', -168, '2023-10-15', '2023-10-16', -1, ARRAY['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-2, 1, 'Not interesting at all.', -169, '2023-10-11', '2023-10-15', -2, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=','https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-3, 3, 'OK tour.', -168, '2023-10-10', '2023-10-16', -3, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-21, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-22, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-23, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-24, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-25, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-26, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-27, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);
INSERT INTO tours."Reviews"(
    "Id", "Rating", "Comment", "TouristId", "TourVisitDate", "CommentDate", "TourId", "Images")
VALUES (-28, 5, 'OK tour.', -168, '2023-10-10', '2023-10-16', -21, ARRAY ['https://media.istockphoto.com/id/1160139387/photo/early-morning-in-a-mountains.jpg?s=612x612&w=0&k=20&c=kYe3OeVfR4tx5gQcH3R53QdxwJWV_qSqYFZ7KNRj-Lk=']);

INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-6, -3, 'Dunavski park', 'Dunavski park je oaza prirode usred grada, savršeno mesto za opuštanje i šetnju. Sa šarmantnim stazama, cvetnim alejama i jezerom, posetioci mogu uživati u mirnom okruženju. Park takođe često domaćin različitim kulturnim događajima, koncertima i umetničkim izložbama.', 19.850515, 45.25436, 'Dunavski park', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 1, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-43, -21, 'Mileticev Spomenik', 'Lorem ipsum.', 19.855529, 45.252574, 'Сунчани кеј, Нови Сад', 'https://sremskevesti.rs/wp-content/uploads/2023/10/0033-1024x665-1-860x558.jpg', 0, true, '{"Description": "Spomenik je rad vajara Jovana Soldatovića i otkriven je 1971. godine."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-44, -22, 'Saborna crkva', 'Lorem ipsum.', 19.847114, 45.236624, 'Сунчани кеј, Нови Сад', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 1, true, '{"Description": "Ulaz u plažu je besplatan preko godine."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-45, -22, 'Matica srpska', 'Lorem ipsum.', 19.844811, 45.255049, 'Нови Сад', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 0, true, '{"Description": "Bio je predsednik Družine za ujedinjenje i oslobođenje Srbije sa sedištem na Cetinju, a tada mu je najbliži saradnik na Cetinju Aleksandar Sandić."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-46, -23, 'Dunavski park', 'Lorem ipsum.', 19.84788, 45.256936, 'Змај Јовина 26, Нови Сад', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 1, true, '{"Description": "Njegove najznačajnije zbirke pesama su „Đulići“ i „Đulići uveoci“, prva o srećnom porodičnom životu, a druga o bolu za najmilijima."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-47, -23, 'Futoski park', 'Lorem ipsum.', 19.853335, 45.256402, 'Muzej savremene umetnosti', 'https://chasingthedonkey.b-cdn.net/wp-content/uploads/2018/09/Novi-Sad-Serbia_shutterstock_3285831_eTbtl.jpg', 0, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-4, -2, 'Trg Jovana Jovanovića Zmaja', 'Jovan Jovanović Zmaj (Novi Sad, 6. decembar 1833 — Sremska Kamenica, 14. jun 1904) bio je srpski pesnik, dramski pisac, prevodilac i lekar. Smatra se za jednog od najvećih liričara srpskog romantizma.', 19.84788, 45.256936, 'Змај Јовина 26, Нови Сад', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 0, true, '{"Description": "Njegove najznačajnije zbirke pesama su „Đulići“ i „Đulići uveoci“, prva o srećnom porodičnom životu, a druga o bolu za najmilijima."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-3, -2, 'Trg Svetozara Miletića', 'Svetozar Miletić (Mošorin, 22. februar 1826 — Vršac, 4. februar 1901) bio je advokat, političar i gradonačelnik Novog Sada. Miletić je bio jedan od najznačajnijih i najuticajnijih srpskih političara u Austrougarskoj druge polovine XIX veka.', 19.844811, 45.255049, 'Нови Сад', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 1, true, '{"Description": "Bio je predsednik Družine za ujedinjenje i oslobođenje Srbije sa sedištem na Cetinju, a tada mu je najbliži saradnik na Cetinju Aleksandar Sandić."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-2, -1, 'Štrand', 'Štrand je popularna plaža u Novom Sadu. Nalazi se na Dunavu, u blizini Mosta slobode i važi za jednu od najuređenijih plaža na celom toku reke.', 19.847114, 45.236624, 'Сунчани кеј, Нови Сад', 'https://live.staticflickr.com/65535/50079707932_124f7b7949_b.jpg', 0, true, '{"Description": "Ulaz u plažu je besplatan preko godine."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-1, -1, 'Kej žrtava racije', 'U Novom Sadu, na keju koji danas nosi ime Kej žrtava racije, fašistički okupator je u takozvanoj „januarskoj raciji“ od 21. do 23. januara 1942. izvršio masovno streljanje više od hiljadu nedužnih građana Novog Sada.', 19.855529, 45.252574, 'Сунчани кеј, Нови Сад', 'https://sremskevesti.rs/wp-content/uploads/2023/10/0033-1024x665-1-860x558.jpg', 1, true, '{"Description": "Spomenik je rad vajara Jovana Soldatovića i otkriven je 1971. godine."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-48, -24, 'KC lab', 'Lorem ipsum.', 19.850515, 45.25436, 'Dunavski park', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 1, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-57, -28, 'Katedrala', 'Lorem ipsum', 19.861115, 45.253437, 'Petrovoradinska tvrđava', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 0, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-56, -28, 'Petrovaradinska tvrđava', 'Petrovaradinska tvrđava je monumentalna tvrđava koja dominira horizontom Novog Sada. Sa svojim impozantnim bastionima, kamenim zidinama i nezaboravnim pogledom na Dunav, tvrđava predstavlja istorijski biser. Posetioci mogu istražiti unikatne podzemne prolaze, uživati u pogledu sa čuvenih Petrovaradinskih satova i doživeti spoj prošlosti i savremene umetnosti tokom EXIT festivala koji se održava unutar tvrđave.', 19.861115, 45.253437, 'Petrovoradinska tvrđava', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 1, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-55, -27, 'Splavovi na Ribarcu', 'Lorem ipsum.', 19.850515, 45.25436, 'Dunavski park', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 0, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-54, -27, 'Laze Teleckog', 'Lorem ipsum.', 19.853335, 45.256402, 'Muzej savremene umetnosti', 'https://chasingthedonkey.b-cdn.net/wp-content/uploads/2018/09/Novi-Sad-Serbia_shutterstock_3285831_eTbtl.jpg', 1, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-53, -26, 'Karlovacke vinarije', 'Lorem ipsum.', 19.84788, 45.256936, 'Змај Јовина 26, Нови Сад', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 0, true, '{"Description": "Njegove najznačajnije zbirke pesama su „Đulići“ i „Đulići uveoci“, prva o srećnom porodičnom životu, a druga o bolu za najmilijima."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-52, -26, 'Vinarija Kovacevic', 'Lorem ipsum.', 19.844811, 45.255049, 'Нови Сад', 'https://novisad.travel/wp-content/uploads/2019/01/Dunavski-park-_ALE8018_compressed.jpg', 1, true, '{"Description": "Bio je predsednik Družine za ujedinjenje i oslobođenje Srbije sa sedištem na Cetinju, a tada mu je najbliži saradnik na Cetinju Aleksandar Sandić."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-51, -25, 'Grcki giros', 'Stadion Vojvodine.', 19.847114, 45.236624, 'Сунчани кеј, Нови Сад', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 0, true, '{"Description": "Ulaz u plažu je besplatan preko godine."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-50, -25, 'Plava frajla', 'Lorem ipsum.', 19.855529, 45.252574, 'Сунчани кеј, Нови Сад', 'https://sremskevesti.rs/wp-content/uploads/2023/10/0033-1024x665-1-860x558.jpg', 1, true, '{"Description": "Spomenik je rad vajara Jovana Soldatovića i otkriven je 1971. godine."}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-49, -24, 'Petrovaradinska tvrđava', 'Petrovaradinska tvrđava je monumentalna tvrđava koja dominira horizontom Novog Sada. Sa svojim impozantnim bastionima, kamenim zidinama i nezaboravnim pogledom na Dunav, tvrđava predstavlja istorijski biser. Posetioci mogu istražiti unikatne podzemne prolaze, uživati u pogledu sa čuvenih Petrovaradinskih satova i doživeti spoj prošlosti i savremene umetnosti tokom EXIT festivala koji se održava unutar tvrđave.', 19.861115, 45.253437, 'Petrovoradinska tvrđava', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 0, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-42, -21, 'Muzej Vojvodine', 'Lorem ipsum.', 19.861115, 45.253437, 'Petrovoradinska tvrđava', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 1, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-7, -3, 'Petrovaradinska tvrđava', 'Petrovaradinska tvrđava je monumentalna tvrđava koja dominira horizontom Novog Sada. Sa svojim impozantnim bastionima, kamenim zidinama i nezaboravnim pogledom na Dunav, tvrđava predstavlja istorijski biser. Posetioci mogu istražiti unikatne podzemne prolaze, uživati u pogledu sa čuvenih Petrovaradinskih satova i doživeti spoj prošlosti i savremene umetnosti tokom EXIT festivala koji se održava unutar tvrđave.', 19.861115, 45.253437, 'Petrovoradinska tvrđava', 'https://live.staticflickr.com/65535/50079707932_124f7b7949_b.jpg', 0, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-5, -3, 'Muzej savremene umetnosti Vojvodine', 'Ovaj muzej je epicentar savremene umetnosti u Novom Sadu. Njegova zbirka obuhvata dela domaćih i međunarodnih umetnika, pružajući posetiocima uvid u širok spektar umetničkih izraza. Prostori muzeja su moderni i inovativni, nudeći iskustvo koje istražuje granice umetnosti i kulture', 19.853335, 45.256402, 'Muzej savremene umetnosti', 'https://sremskevesti.rs/wp-content/uploads/2023/10/0033-1024x665-1-860x558.jpg', 2, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-60, -29, 'Prva kljucna tacka', 'Ovde zivi najveca legenda', 19.835568666458133, 45.242893955461476, '54  Bulevar Cara Lazara  Novi Sad  21102  Serbia', 'https://www.funtravelnis.rs/wp-content/uploads/2017/11/trebinje-4607172__340.jpg', 0, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-59, -29, 'Druga kljucna tacka', 'Ovde ne zivi legenda', 19.807555675506595, 45.27031287156058, '4  Mihala Babinke  Novi Sad  21113  Serbia', 'https://live.staticflickr.com/65535/50079707932_124f7b7949_b.jpg', 1, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-58, -29, 'Treca kljucna tacka', 'Opis', 19.837945103645325, 45.25096504850316, '91  Bulevar oslobodjenja  Novi Sad  21000  Serbia', 'https://sremskevesti.rs/wp-content/uploads/2023/10/0033-1024x665-1-860x558.jpg', 2, true, '{"Images": [""], "Description": ""}', false, false);
INSERT INTO tours."KeyPoints" ("Id", "TourId", "Name", "Description", "Longitude", "Latitude", "LocationAddress", "ImagePath", "Order", "HaveSecret", "Secret", "IsEncounterRequired", "HasEncounter") 
VALUES (-8, -3, 'Ljuljaška u parku', '6 bikova na jednoj ljuji, nije se moglo dobro završiti...', 19.861115, 45.253437, 'Ljuljaška', 'attachments', 3, false, '{"Images": [""], "Description": ""}', false, false);



CREATE SCHEMA "encounters";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."Encounters" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Title" text NOT NULL,
	"Description" text NOT NULL,
	"Picture" text NOT NULL,
	"Longitude" double precision NOT NULL,
	"Latitude" double precision NOT NULL,
	"Radius" double precision NOT NULL,
	"XpReward" integer NOT NULL,
	"Status" integer NOT NULL,
	"Type" integer NOT NULL,
	"Instances" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."HiddenLocationEncounters" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"PictureLongitude" double precision NOT NULL,
	"PictureLatitude" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."KeyPointEncounter" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"KeyPointId" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."MiscEncounters" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"ChallengeDone" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."SocialEncounters" (
	"Id" bigint PRIMARY KEY NOT NULL,
	"PeopleNumber" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "encounters"."TouristProgress" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" bigint NOT NULL,
	"Xp" integer NOT NULL,
	"Level" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."HiddenLocationEncounters" ADD CONSTRAINT "HiddenLocationEncounters_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."KeyPointEncounter" ADD CONSTRAINT "KeyPointEncounter_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."MiscEncounters" ADD CONSTRAINT "MiscEncounters_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "encounters"."SocialEncounters" ADD CONSTRAINT "SocialEncounters_Id_Encounters_Id_fk" FOREIGN KEY ("Id") REFERENCES "encounters"."Encounters"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-9, 'Balans', 'Pojesti švarcvald balansaru za manje od 4 minute.', 'https://scontent.fbeg7-2.fna.fbcdn.net/v/t1.6435-9/95715864_2058813777577124_6055717451419615232_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=c2f564&_nc_ohc=7hGa_upOwRkAX-6dADQ&_nc_ht=scontent.fbeg7-2.fna&oh=00_AfDO1JahhT56YrE_KmmDL760vLpX-dd1qzgHSmbL6OGG2A&oe=65B3F22E', 19.8374354839325, 45.25227550147874, 50, 30, 0, 2, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-14, 'Bubi dupla', 'Pojesti bubi duplu', 'https://bubi.rs/wp-content/uploads/2022/12/banner2-scaled.jpg', 19.842451214790348, 45.247939939289836, 50, 15, 0, 2, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-7, 'Plašenje gotičarki', 'Uraditi 20 sklekova bez majice ispred filozofskog fakulteta.', 'https://i.ytimg.com/vi/kQ0vSvFKtJU/maxresdefault.jpg', 19.853737950325012, 45.24668981590247, 30, 85, 0, 2, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-13, 'Pronaći krticu', 'Gde li se misteriozna krtica krtiči?', 'https://media.discordapp.net/attachments/783721881043206154/1182032447857242222/1701888891690.jpg', 19.84788537025452, 45.235828447337155, 50, 60, 0, 1, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-12, 'Bustovanje na Štrandiću', 'Pronaći lokaciju sa koje je slikan legendarni tripl Štrandić bust.', 'https://cdn.discordapp.com/attachments/783721881043206154/1182031344956604527/1701888624282.jpg', 19.849065542221073, 45.23699192743748, 50, 40, 0, 1, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-10, 'Električna vožnja', 'Sesti u električni bus broj 11.', 'https://www.gradnja.rs/wp-content/uploads/2023/06/solaris-urbino12-electric-jgsp-15.jpg', 19.849312305450443, 45.24810611676206, 50, 12, 0, 2, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-11, 'Zaja', 'Poduplati sa prijateljima u zaji.', 'https://oradio.rs/files/uploads/2019/11/mala-menza.jpg', 19.849306941032413, 45.24610440123252, 50, 20, 0, 0, '[]');
INSERT INTO encounters."Encounters" ("Id", "Title", "Description", "Picture", "Longitude", "Latitude", "Radius", "XpReward", "Status", "Type", "Instances") VALUES 
(-15, 'Lepa kuca', 'Gadjaj prozor kamenom', 'https://media.discordapp.net/attachments/783721881043206154/1182032447857242222/1701888891690.jpg', 19.807555675506595, 45.27031287156058, 50, 50, 0, 3, '[{"status": 1, "userId": -5, "completionTime": "2023-12-16T18:44:38.5492356Z"}, {"status": 0, "userId": -4, "completionTime": null}]');
INSERT INTO encounters."HiddenLocationEncounters" ("Id", "PictureLongitude", "PictureLatitude") VALUES (-13, 19.847493767738346, 45.235973883652456);
INSERT INTO encounters."HiddenLocationEncounters" ("Id", "PictureLongitude", "PictureLatitude") VALUES (-12, 19.849011898040775, 45.2370278136203);
INSERT INTO encounters."SocialEncounters" ("Id", "PeopleNumber") VALUES (-11, 1);
INSERT INTO encounters."MiscEncounters" ("Id", "ChallengeDone") VALUES (-7, false);
INSERT INTO encounters."MiscEncounters" ("Id", "ChallengeDone") VALUES (-10, false);
INSERT INTO encounters."MiscEncounters" ("Id", "ChallengeDone") VALUES (-9, false);
INSERT INTO encounters."MiscEncounters" ("Id", "ChallengeDone") VALUES (-14, false);
INSERT INTO encounters."KeyPointEncounter" ("Id", "KeyPointId") VALUES (-15, -59);