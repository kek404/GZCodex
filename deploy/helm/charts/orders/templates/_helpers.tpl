{{- define "orders.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "orders.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "orders.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
