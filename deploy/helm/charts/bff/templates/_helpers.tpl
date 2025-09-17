{{- define "bff.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "bff.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "bff.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
