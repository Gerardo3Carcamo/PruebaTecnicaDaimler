create database Hospital;
use Hospital;

CREATE TABLE [dbo].[ROLE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](20) NOT NULL,
	[Description] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

insert into [ROLE] values 
('Administrador', 'Puede ver el dashboard y el inventario'),
('Doctor', 'Puede atender citas creadas por los usuarios'),
('Paciente', 'Puede crear, ver, actualizar y eliminar citas, a la vez ver sus recetas')

CREATE TABLE [dbo].[USERS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](60) NOT NULL,
	[Phone] [varchar](10) NOT NULL,
	[Password] [varchar](16) NOT NULL,
	[RoleID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[USERS]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[ROLE] ([Id])

insert into users values('Emilio Carranza', '8443832692', 'Admin1.$', 1),
('Mario Gómez', '8441309847', 'Doct_1#', 2),('Alexa Mireles', '8441234567', 'Doct_2#', 1),
('Nadia Guerrero', '8448065676', 'Pac_$021', 3), ('Jesus Rojas', '8440987654', 'Pac_$021', 3)

CREATE TABLE [dbo].[APPOINTMENTS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TsAppointment] [datetime] NOT NULL,
	[DoctorId] [int] NOT NULL,
	[PatientId] [int] NOT NULL,
	[State] [varchar](50) NOT NULL,
	[Observations] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] 

ALTER TABLE [dbo].[APPOINTMENTS]  WITH CHECK ADD FOREIGN KEY([DoctorId])
REFERENCES [dbo].[USERS] ([Id]) 

ALTER TABLE [dbo].[APPOINTMENTS]  WITH CHECK ADD FOREIGN KEY([PatientId])
REFERENCES [dbo].[USERS] ([Id])

insert into [APPOINTMENTS] values
('2023-01-02', 2, 4, 'Atendido', 'Primera consulta del paciente, presenta molestia estomacal y dolor de cabeza'),
('2023-01-03', 2, 5, 'Atendido', 'Se presenta mejora del paciente respecto a su consulta anterior, se recomienda una nueva cita'),
('2023-02-04', 3, 4, 'Atendido', 'Primera consulta del paciente, presenta molestia en la espalda, se sospecha de lumbagía'),
('2023-03-05', 2, 5, 'Atendido', 'Paciente se queja de dolor en las rodillas, se mandará tratamiento y ejercicio'),
('2023-04-06', 3, 4, 'Atendido', 'Se tuvo que ingresar al paciente en cuidados intensivos por dolor de espalda'),
('2023-05-07', 2, 4, 'Atendido', 'Se da de alta al paciente por mejoras en su dolor'),
('2023-06-08', 2, 5, 'Atendido', 'Paciente responde positivamente al tratamiento mandado en la consulta anterior'),
('2023-07-09', 2, 4, 'Atendido', 'Paciente vuelve por dolor de espalda, se le dara un tratamiento mas fuerte')

CREATE TABLE [dbo].[MEDICINE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](150) NOT NULL,
	[ExistingQuantity] [int] NOT NULL,
 CONSTRAINT [PK__MEDICINE__3214EC2702B3908C] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] 

INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Ibuprofeno', 'Analgésico y antiinflamatorio. Alivia el dolor y la inflamación.', 0);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Paracetamol (acetaminofén)', 'Analgésico y antipirético. Trata el dolor y reduce la fiebre.', 200);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Amoxicilina', 'Antibiótico de amplio espectro. Trata infecciones bacterianas.', 120);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Omeprazol', 'Inhibidor de la bomba de protones. Reduce la producción de ácido.', 180);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Simvastatina', 'Reduce el colesterol. Previene enfermedades cardiovasculares.', 100);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Atorvastatina', 'Reduce el colesterol. Disminuye riesgo de enfermedades cardíacas.', 90);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Lisinopril', 'Trata hipertensión. Mejora función cardíaca.', 80);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Metformina', 'Controla azúcar en sangre en diabetes tipo 2.', 110);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Amlodipino', 'Trata hipertensión y enfermedad coronaria.', 95);
INSERT INTO Medicine ([Name], [Description], ExistingQuantity) VALUES ('Levothyroxine', 'Reemplazo hormonal para hipotiroidismo.', 75);

CREATE TABLE [dbo].[PRESCRIPTION](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AppointmentId] [int] NOT NULL,
	[MedicineId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] 

ALTER TABLE [dbo].[PRESCRIPTION]  WITH CHECK ADD FOREIGN KEY([AppointmentId])
REFERENCES [dbo].[APPOINTMENTS] ([Id]) 

ALTER TABLE [dbo].[PRESCRIPTION]  WITH CHECK ADD  CONSTRAINT [FK__PRESCRIPT__MEDIC__4222D4EF] FOREIGN KEY([MedicineId])
REFERENCES [dbo].[MEDICINE] ([Id]) 

ALTER TABLE [dbo].[PRESCRIPTION] CHECK CONSTRAINT [FK__PRESCRIPT__MEDIC__4222D4EF] 

-- Insertar valores en la tabla PRESCRIPTION sin repetir MedicineId dentro del mismo AppointmentId
INSERT INTO PRESCRIPTION (AppointmentId, MedicineId, Quantity)
VALUES (1, 3, ROUND(RAND() * 15 + 1, 0)), 
       (1, 5, ROUND(RAND() * 15 + 1, 0)), 
       (1, 8, ROUND(RAND() * 15 + 1, 0)), 
       (2, 1, ROUND(RAND() * 15 + 1, 0)), 
       (2, 6, ROUND(RAND() * 15 + 1, 0)), 
       (2, 9, ROUND(RAND() * 15 + 1, 0)), 
       (3, 2, ROUND(RAND() * 15 + 1, 0)), 
       (3, 7, ROUND(RAND() * 15 + 1, 0)), 
       (3, 10, ROUND(RAND() * 15 + 1, 0)), 
       (4, 4, ROUND(RAND() * 15 + 1, 0)), 
       (4, 8, ROUND(RAND() * 15 + 1, 0)), 
       (4, 9, ROUND(RAND() * 15 + 1, 0)), 
       (5, 1, ROUND(RAND() * 15 + 1, 0)), 
       (5, 3, ROUND(RAND() * 15 + 1, 0)), 
       (5, 7, ROUND(RAND() * 15 + 1, 0)), 
       (6, 2, ROUND(RAND() * 15 + 1, 0)), 
       (6, 4, ROUND(RAND() * 15 + 1, 0)), 
       (6, 10, ROUND(RAND() * 15 + 1, 0)), 
       (7, 1, ROUND(RAND() * 15 + 1, 0)), 
       (7, 5, ROUND(RAND() * 15 + 1, 0)), 
       (7, 6, ROUND(RAND() * 15 + 1, 0)), 
       (8, 3, ROUND(RAND() * 15 + 1, 0)), 
       (8, 7, ROUND(RAND() * 15 + 1, 0)), 
       (8, 9, ROUND(RAND() * 15 + 1, 0));




