create database KARATRA;

use KARATRA;

create table ARRONDISSEMENT (
    idArrondissement int(11) NOT NULL AUTO_INCREMENT,
    nomArrondissement varchar(30) NOT NULL,
    adressArrondissement varchar(50) NOT NULL,
    PRIMARY KEY (idArrondissement)
);

create table ORIGINE (
    idOrigine int(11) NOT NULL AUTO_INCREMENT,
    nomOrigine varchar(30) NOT NULL,
    PRIMARY KEY (idOrigine)
);

create table PROFESSION (
    idProfession int(11) NOT NULL AUTO_INCREMENT,
    nomProfession varchar(30) NOT NULL,
    PRIMARY KEY (idProfession)
);

create table UTILISATEUR(
    idUtilisateur int(11) NOT NULL AUTO_INCREMENT,
    attribut varchar(15) DEFAULT 'Utilisateur',
    identification varchar(50) NOT NULL,
    photoPDP varchar(250) DEFAULT NULL,
    mdp varchar(100) NOT NULL,
    etatUtilisateur BOOLEAN DEFAULT '0',
    PRIMARY KEY (idUtilisateur)
);

create table tmpINDIVIDU (
    idtmpIndividu int(225) NOT NULL AUTO_INCREMENT,
    nom varchar(50) NOT NULL,
    prenom varchar(100) NOT NULL,
    nomPere varchar(150) NOT NULL,
    nomMere varchar(150) NOT NULL,
    lieunais varchar(100) NOT NULL,
    datenais date,
    domicile varchar(100) NOT NULL,
    cicatrice varchar(50),
    longueur float(2) NOT NULL,
    datelivrance date,
    imgFaceFM varchar(250) NOT NULL,
    imgDosFM varchar(250) NOT NULL,
    idOrigine int(11) NOT NULL,
    idArrondissement int(11) NOT NULL,
    idProfession int(20) NOT NULL,
    approbation varchar (4) DEFAULT 'non',
    etatCin varchar(15) NOT NULL,
    dateProcedure Date NOT NULL,
    numSeries varchar(15) NOT NULL,
    observation varchar (50),
    idUtilisateur int(11) NOT NULL,
    PRIMARY KEY (idtmpIndividu),
    FOREIGN KEY (idOrigine) REFERENCES ORIGINE (idOrigine),
    FOREIGN KEY (idArrondissement) REFERENCES ARRONDISSEMENT (idArrondissement),
    FOREIGN KEY (idProfession) REFERENCES PROFESSION (idProfession),
    FOREIGN KEY (idUtilisateur) REFERENCES UTILISATEUR (idUtilisateur)
);

create table INDIVIDU (
    cin varchar(12) NOT NULL,
    nom varchar(75) NOT NULL,
    prenom varchar(150) NOT NULL,
    nomPere varchar(150) NOT NULL,
    nomMere varchar(150) NOT NULL,
    lieunais varchar(100) NOT NULL,
    datenais date,
    domicile varchar(100) NOT NULL,
    cicatrice varchar(50) DEFAULT NULL,
    longueur float(2) NOT NULL,
    datelivrance date,
    imgFaceFM varchar(250) DEFAULT NULL,
    imgDosFM varchar(250) DEFAULT NULL,
    p_idOrigine int(11) NOT NULL,
    p_idArrondissement int(11) NOT NULL,
    p_idProfession int(20) NOT NULL,
    PRIMARY KEY (cin),
    FOREIGN KEY (p_idOrigine) REFERENCES ORIGINE (idOrigine),
    FOREIGN KEY (p_idArrondissement) REFERENCES ARRONDISSEMENT (idArrondissement),
    FOREIGN KEY (p_idProfession) REFERENCES PROFESSION (idProfession)
);

create table PROCEDURE_CIN(
    idProcedureCin int(11) NOT NULL AUTO_INCREMENT,
    approbation varchar (4) DEFAULT 'NON',
    etatCin varchar(15) NOT NULL,
    dateProcedure Date NOT NULL,
    numSeries varchar(15) NOT NULL,
    observation varchar (50),
    p_idUtilisateur int(11) NOT NULL,
    p_cin varchar(12) NOT NULL,
    PRIMARY KEY (idProcedureCin),
    FOREIGN KEY (p_idUtilisateur) REFERENCES UTILISATEUR (idUtilisateur),
    FOREIGN KEY (p_cin) REFERENCES INDIVIDU (cin)
);

ALTER TABLE
    tmpIndividu AUTO_INCREMENT = 99;

ALTER TABLE
    PROCEDURE_CIN AUTO_INCREMENT = 11;

INSERT INTO
    `utilisateur` (
        `idUtilisateur`,
        `attribut`,
        `identification`,
        `mdp`,
        `etatUtilisateur`
    )
VALUES
    (
        '1',
        'Administrateur',
        'michella',
        '$2b$10$c25jNx6.WFDML7XBlD3LOeTX.7g1Re37084M85jVAzNpAl32zvU/G',
        '1'
    ),
    (
        '2',
        'Administrateur',
        'nuno',
        '$2b$10$NFHMHtMCN4GOueDBmqFQKOwuQJKNtlW.1EUeSbpu2Y5qE8bcjWMnm',
        '1'
    ),
    (
        '3',
        'Délégué',
        'Nina',
        '$2b$10$OY8ge/l/CITKMFpdG90k6u9UzibhyerVS87HYht/YgMhXVuW1xv9G',
        '1'
    );

INSERT INTO
    `arrondissement` (
        `idArrondissement`,
        `nomArrondissement`,
        `AdressArrondissement`
    )
VALUES
    ('1', 'VILLE HAUTE', 'Tsianolondroa');

INSERT INTO
    `profession` (`idProfession`, `nomProfession`)
VALUES
    ('1', 'Etudiant');

INSERT INTO
    `origine` (`idOrigine`, `nomOrigine`)
VALUES
    ('1', 'BETSILEO');
    