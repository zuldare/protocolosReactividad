package jh.mastercloud.toposervice.model;

public enum Landscape {
    FLAT, MOUNTAIN;

    @Override
    public String toString() {
        return super.toString().toLowerCase();
    }
}
