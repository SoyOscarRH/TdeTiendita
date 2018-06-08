USE TdeTiendita;

/* ======================================================
 * =====      GET PRODUCT DATA FROM BARCODE      ========
 * ======================================================
 */
DROP PROCEDURE IF EXISTS GetProductDataFromBarCode;

DELIMITER //
CREATE PROCEDURE GetProductDataFromBarCode(IN ThisBarcode VARCHAR(15))
BEGIN
    SELECT PriceOfSale as UnitPrice, Name, Barcode FROM Product, Barcode 
        WHERE 
            Barcode.Barcode = (ThisBarcode) AND 
            Barcode.ProductID = Product.ID;
END //

DELIMITER ;

/* ======================================================
 * =====      GET PRODUCT DATA FROM BARCODE      ========
 * ======================================================
 */
DROP PROCEDURE IF EXISTS GetAllProductData;
DELIMITER |
CREATE PROCEDURE GetAllProductData(IN ProductQuery VARCHAR(15))
BEGIN
    SELECT 
        Product.Name, Description, PriceOfSale, PriceAcquisition, CurrentQuantity, 
        Brand.Name AS BrandName, Provider.Name AS ProviderName
            FROM Product, Barcode, Brand, Provider
            WHERE 
                Product.Name LIKE CONCAT('%', ProductQuery, '%') 
                AND
                (
                    Barcode.ProductID = Product.ID      AND
                    Product.IDBrand   = Brand.ID        AND
                    Brand.ProviderID  = Provider.ID
                )
    UNION
    SELECT 
        Product.Name, Description, PriceOfSale, PriceAcquisition, CurrentQuantity, 
        Brand.Name AS BrandName, Provider.Name AS ProviderName
            FROM Product, Barcode, Brand, Provider
            WHERE 
                Product.Description LIKE CONCAT('%', ProductQuery, '%')
                AND
                (
                    Barcode.ProductID = Product.ID      AND
                    Product.IDBrand   = Brand.ID        AND
                    Brand.ProviderID  = Provider.ID
                )
    UNION
    SELECT 
        Product.Name, Description, PriceOfSale, PriceAcquisition, CurrentQuantity, 
        Brand.Name AS BrandName, Provider.Name AS ProviderName
            FROM Product, Barcode, Brand, Provider
            WHERE 
                Barcode.Barcode LIKE CONCAT('%', ProductQuery, '%')
                AND
                (
                    Barcode.ProductID = Product.ID      AND
                    Product.IDBrand   = Brand.ID        AND
                    Brand.ProviderID  = Provider.ID
                );

END |
DELIMITER ;



/*
DROP PROCEDURE IF EXISTS addEmployee;
DELIMITER //
CREATE PROCEDURE addEmployee(IN Name VARCHAR(30), IN Surnames VARCHAR(30), IN Password VARCHAR(30), IN Salary DOUBLE, IN Email VARCHAR(30), IN isAdmin BOOLEAN, OUT salida BOOLEAN)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = 0;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO Employee (Salary, Name, Surnames, Email, Password, isAdmin)
        VALUES (Salary, Name, Surnames, Email, MD5(CONCAT(Password, MD5(Password))), isAdmin);
    COMMIT;
    SET salida = 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addProvider;
DELIMITER //
CREATE PROCEDURE addProvider(IN Name VARCHAR(30), OUT salida BOOLEAN)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = 0;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO Provider (Name) VALUES (Name);
    COMMIT;
    SET salida = 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS logIn;
DELIMITER //
CREATE PROCEDURE logIn(IN Email VARCHAR(30), IN Password VARCHAR(30), OUT salida INT)
BEGIN
    SET salida = -1;
    SELECT ID into salida
    FROM Employee
    WHERE Employee.Email = Email
    AND Employee.Password = MD5(CONCAT(Password, MD5(Password)));
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addBrand;
DELIMITER //
CREATE PROCEDURE addBrand(IN Name VARCHAR(30), IN ProviderID INT, OUT salida BOOLEAN)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = 0;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO Brand (Name, ProviderID) VALUES (Name, ProviderID);
    COMMIT;
    SET salida = 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addProduct;
DELIMITER //
CREATE PROCEDURE addProduct(IN CodeBar VARCHAR(15), IN Name VARCHAR(100); IN Description VARCHAR(300), IN PriceOfSale DOUBLE, IN PriceAcquisition DOUBLE, IN CurrentQuantity DOUBLE, IN IDBrand INT, OUT salida BOOLEAN)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = 0;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO Product (CodeBar, Name, Description, PriceOfSale, PriceAcquisition, CurrentQuantity, IDBrand)
        VALUES (CodeBar, Name, Description, PriceOfSale, PriceAcquisition, CurrentQuantity, IDBrand);
    COMMIT;
    SET salida = 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addScheduleEmployee;
DELIMITER //
CREATE PROCEDURE addScheduleEmployee(IN IDEmployee INT, IN Day INT, IN hourStart TIME, IN hourEnd TIME, OUT salida BOOLEAN)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = 0;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO ScheduleEmployee(IDEmployee, Day, hourStart, hourEnd)
        VALUES (IDEmployee, Day, hourStart, hourEnd);
    COMMIT;
    SET salida = 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addScheduleProvider;
DELIMITER //
CREATE PROCEDURE addScheduleProvider(IN IDProvider INT, IN Day INT, IN hourStart TIME, IN hourEnd TIME, OUT salida BOOLEAN)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = 0;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO ScheduleProvider(IDProvider, Day, hourStart, hourEnd)
        VALUES (IDProvider, Day, hourStart, hourEnd);
    COMMIT;
    SET salida = 1;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addSale;
DELIMITER //
CREATE PROCEDURE addSale(IN EmployeeID INT, DateOfSale DATETIME, OUT salida INT)
BEGIN
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
        SET salida = -1;
        ROLLBACK;
    END;
    START TRANSACTION;
        INSERT INTO Sale(EmployeeID, DateOfSale)
        VALUES (EmployeeID, DateOfSale);
        SET salida = LAST_INSERT_ID();
    COMMIT;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addUnitSale;
DELIMITER //
CREATE PROCEDURE addUnitSale(IN SaleID)


*/
