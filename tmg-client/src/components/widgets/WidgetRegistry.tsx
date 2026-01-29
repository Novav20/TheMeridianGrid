import { StatWidget } from "./StatWidget";
import { ChartWidget } from "./ChartWidget";
import { StatusWidget } from "./StatusWidget";
import type { ComponentType } from "react";

export type WidgetType = "STAT_WIDGET" | "CHART_WIDGET" | "STATUS_WIDGET";

interface WidgetRegistryItem {
    component: ComponentType<any>;
    defaultProps: Record<string, any>;
    defaultSize: { w: number; h: number };
}

export const WIDGET_REGISTRY: Record<WidgetType, WidgetRegistryItem> = {
    STAT_WIDGET: {
        component: StatWidget,
        defaultProps: { title: "New Stat", value: 0 },
        defaultSize: { w: 2, h: 2 },
    },
    CHART_WIDGET: {
        component: ChartWidget,
        defaultProps: { title: "New Chart" },
        defaultSize: { w: 4, h: 4 },
    },
    STATUS_WIDGET: {
        component: StatusWidget,
        defaultProps: { title: "New Status", isActive: true },
        defaultSize: { w: 2, h: 2 },
    },
};

export const renderWidget = (type: WidgetType, props: any) => {
    const registryItem = WIDGET_REGISTRY[type];
    if (!registryItem) return null;

    const Component = registryItem.component;
    return <Component {...registryItem.defaultProps} {...props} />;
};
