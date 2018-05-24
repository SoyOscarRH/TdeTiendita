/* ===============================================================
 * =================       TABLES          =======================
 * ===============================================================
 */

DROP DATABASE IF EXISTS TdeTiendita;
CREATE DATABASE TdeTiendita;
USE TdeTiendita;



/* ======================================================
 * =================  SCHEDULE    =======================
 * ======================================================
 */
CREATE TABLE Schedule (
    ID                  INT NOT NULL AUTO_INCREMENT,

    MondayStart         ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    
    MondayEnd           ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    TuesdayStart        ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    TuesdayEnd          ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    WednesdayStart      ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    WednesdayEnd        ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    ThursdayStart       ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    ThursdayEnd         ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    
    FridayStart         ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    FridayEnd           ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    
    SaturdayStart       ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    SaturdayEnd         ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),
    
    SundayStart         ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    SundayEnd           ENUM(
                            '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
                            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
                            '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
                            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
                            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
                            'undefined'
                        ),

    PRIMARY KEY(ID)
);



/* ======================================================
 * =================  EMPLOYEES   =======================
 * ======================================================
 */
CREATE TABLE Employee (
    ID                  INT NOT NULL AUTO_INCREMENT,
    Salary              REAL,
    Name                VARCHAR(15),
    Surnames            VARCHAR(15),
    Email               VARCHAR(30),
    Password            VARCHAR(100),
    ScheduleID          INT NOT NULL,

    PRIMARY KEY(ID),

    FOREIGN KEY (ScheduleID)
        REFERENCES Schedule(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);



/* ======================================================
 * =================    BRAND     =======================
 * ======================================================
 */
CREATE TABLE Provider (
    Name                VARCHAR(15),
    ScheduleID          INT,

    PRIMARY KEY(Name),

    FOREIGN KEY (ScheduleID)
        REFERENCES Schedule(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


/* ======================================================
 * =================    BRAND     =======================
 * ======================================================
 */
CREATE TABLE Brand (
    Name                VARCHAR(15),
    ProviderName        VARCHAR(15),

    PRIMARY KEY(Name),

    FOREIGN KEY (ProviderName)
        REFERENCES Provider(Name)
        ON DELETE CASCADE
        ON UPDATE CASCADE

);

/* ======================================================
 * =================  PRODUCT     =======================
 * ======================================================
 */
CREATE TABLE Product (
    CodeBar             VARCHAR(15),
    Name                VARCHAR(100),
    Price               REAL,
    PriceAcquisition    REAL,
    CurrentQuantity     INT,
    Brand               VARCHAR(15),

    PRIMARY KEY(CodeBar),

    FOREIGN KEY (Brand)
        REFERENCES Brand(Name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);





