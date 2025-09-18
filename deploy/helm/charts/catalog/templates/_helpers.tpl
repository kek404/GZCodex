{{- define "catalog.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "catalog.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "catalog.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
