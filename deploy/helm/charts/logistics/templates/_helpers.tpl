{{- define "logistics.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "logistics.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "logistics.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
