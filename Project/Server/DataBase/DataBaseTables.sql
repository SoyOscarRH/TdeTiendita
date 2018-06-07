/* ===============================================================
 * =================       TABLES          =======================
 * ===============================================================
 */
DROP DATABASE IF EXISTS TdeTiendita;
CREATE DATABASE TdeTiendita;
USE TdeTiendita;


/* ======================================================
 * =================  EMPLOYEES   =======================
 * ======================================================
 */
CREATE TABLE Employee (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Salary              DOUBLE NOT NULL,
	Name                VARCHAR(30) NOT NULL,
	Surnames            VARCHAR(30) NOT NULL,
	Email               VARCHAR(30) NOT NULL,
	Password            CHAR(32) NOT NULL,
	isAdmin				BOOLEAN NOT NULL,

	PRIMARY KEY(ID),
	UNIQUE(Email)
);



/* ======================================================
 * =================    PROVIDER  =======================
 * ======================================================
 */
CREATE TABLE Provider (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Name                VARCHAR(30) NOT NULL,

	PRIMARY KEY(ID)
);



/* ======================================================
 * ===========     SCHEDULEEMPLOYEE     =================
 * ======================================================
 */
CREATE TABLE ScheduleEmployee (
	ID					INT NOT NULL AUTO_INCREMENT,
	IDEmployee			INT NOT NULL,
	Day					INT NOT NULL,
	hourStart			TIME NOT NULL,
	hourEnd				TIME NOT NULL,

	PRIMARY KEY(ID),

	FOREIGN KEY (IDEmployee)
		REFERENCES Employee(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);



/* ======================================================
 * ===========     SCHEDULEPROVIDER     =================
 * ======================================================
 */
CREATE TABLE ScheduleProvider (
	ID					INT NOT NULL AUTO_INCREMENT,
	IDProvider			INT NOT NULL,
	Day					INT NOT NULL,
	hourStart			TIME NOT NULL,
	hourEnd				TIME NOT NULL,

	PRIMARY KEY(ID),

	FOREIGN KEY (IDProvider)
		REFERENCES Provider(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


/* ======================================================
 * =================    BRAND     =======================
 * ======================================================
 */
CREATE TABLE Brand (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Name                VARCHAR(30) NOT NULL,
	ProviderID          INT NOT NULL,

	PRIMARY KEY(ID),
	UNIQUE(Name),

	FOREIGN KEY (ProviderID)
		REFERENCES Provider(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

/* ======================================================
 * =================  PRODUCT     =======================
 * ======================================================
 */
CREATE TABLE Product (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Name                VARCHAR(100) NOT NULL,
	Description			VARCHAR(300),
	PriceOfSale         DOUBLE NOT NULL,
	PriceAcquisition    DOUBLE NOT NULL,
	CurrentQuantity     DOUBLE NOT NULL,
	IDBrand             INT NOT NULL,

	PRIMARY KEY(ID),
	UNIQUE(Name),

	FOREIGN KEY (IDBrand)
		REFERENCES Brand(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

/* ======================================================
 * =================  BAR CODE    =======================
 * ======================================================
 */
CREATE TABLE Barcode (
	Barcode     VARCHAR(15) NOT NULL,
	ProductID   INT NOT NULL,

	PRIMARY KEY(Barcode),
	UNIQUE(Barcode),

	FOREIGN KEY (ProductID)
		REFERENCES Product(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


/* ======================================================
 * =================     SALE     =======================
 * ======================================================
 */
CREATE TABLE Sale (
	ID                  INT NOT NULL AUTO_INCREMENT,
	EmployeeID          INT NOT NULL,
	DateOfSale          DATETIME NOT NULL,

	PRIMARY KEY(ID),

	FOREIGN KEY (EmployeeID)
		REFERENCES Employee(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


/* ======================================================
 * =============     UNITSALE     =======================
 * ======================================================
 */
CREATE TABLE UnitSale (
	SaleID              INT NOT NULL,
	ProductID           INT NOT NULL,
	QuantitySell        DOUBLE NOT NULL,

	PRIMARY KEY(SaleID, ProductID),

	FOREIGN KEY (SaleID)
		REFERENCES Sale(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,

	FOREIGN KEY (ProductID)
		REFERENCES Product(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
