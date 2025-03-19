package com.example.movil_izate;

import java.sql.Timestamp;

public interface TrayectoService {
    Trayecto iniciarTrayecto(String vehiculoId);
    Trayecto registrarUbicacion(Long trayectoId, double latitud, double longitud);
    Trayecto finalizarTrayecto(Long trayectoId);
}