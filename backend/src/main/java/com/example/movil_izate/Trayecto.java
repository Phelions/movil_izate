package com.example.movil_izate;
import lombok.Data;
import jakarta.persistence.*; // Cambiar javax.persistence a jakarta.persistence
import java.sql.Time;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
public class Trayecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehiculoId;
    private Double latitud;
    private Double longitud;
    private Time hora;
    private Date fecha;
    private Timestamp inicioTrayecto;
    private Timestamp finTrayecto;
}