package jh.mastercloud.toposervice.model;

import java.util.Arrays;
import java.util.Optional;

public enum Landscape {
    FLAT("flat"), MOUNTAIN("mountain");

    private final String label;

    Landscape(String label) {
        this.label = label;
    }

    public static Optional<Landscape> valueOfLabel(String label){
        return Arrays.stream(Landscape.values())
                .filter(landscape -> landscape.label.equals(label))
                .findFirst();
    }

    public String getLabel() {
        return this.label;
    }
}
